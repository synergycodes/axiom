import fs from 'node:fs';
import path from 'node:path';
import type { PluginCreator } from 'postcss';
import { pluginLogger } from '../plugin-logger';

const outputDir = path.resolve(__dirname, '../../static/css');
const stylesFile = path.join(outputDir, 'shadow-dom-styles.css');
const cacheAcceptedPath = path.join(outputDir, 'accepted-paths.json');
const cacheRejectedPath = path.join(outputDir, 'rejected-paths.json');

type ShadowDomCSSOptions = {
  filesToAdd: string[];
  filesToExtractPatterns: string[];
};

let isFirstPluginCall = true;

const generatedMissingPathsAndFilesIfNeeded = () => {
  // It's a gitignored dir and it is generated by the script
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  if (!fs.existsSync(stylesFile)) {
    fs.writeFileSync(
      stylesFile,
      `/*
        Mocked file run: pnpm clear before running server to regenerate.
        For more information about preview debugging, check packages/website/tools/README.md
      */`,
      'utf8',
    );
  }

  if (!fs.existsSync(cacheAcceptedPath)) {
    fs.writeFileSync(cacheAcceptedPath, JSON.stringify([], null, 2), 'utf8');
  }

  if (!fs.existsSync(cacheRejectedPath)) {
    fs.writeFileSync(cacheRejectedPath, JSON.stringify([], null, 2), 'utf8');
  }
};

const createStylesCollector = () => {
  let collectedStyles = '';
  const collectedAcceptedPaths: string[] = [];
  const collectedRejectedPaths: string[] = [];

  const collectStylesFromFile = (
    filePath: string,
    { shouldLogAction = true } = {},
  ) => {
    if (shouldLogAction) {
      pluginLogger.info(
        `🌘 ShadowDomCSS saves: ${filePath.replace(path.resolve(__dirname, '../../../..'), '')}`,
      );
    }

    const fileContent = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf8')
      : '';

    if (fileContent) {
      collectedAcceptedPaths.push(filePath.replaceAll('\\', '/'));
      collectedStyles = `${collectedStyles} ${fileContent}`;

      fs.writeFileSync(stylesFile, collectedStyles, 'utf8');
      fs.writeFileSync(
        cacheAcceptedPath,
        JSON.stringify(collectedAcceptedPaths, null, 2),
        'utf8',
      );
    }
  };

  const collectStylesFromFileForLaterUsage = (fileToFind: string) => {
    const filePath = path.resolve(__dirname, fileToFind);

    const fileContent =
      fs.existsSync(filePath) &&
      !collectedAcceptedPaths.includes(filePath.replaceAll('\\', '/'))
        ? fs.readFileSync(filePath, 'utf8')
        : '';

    if (fileContent) {
      collectedAcceptedPaths.push(filePath.replaceAll('\\', '/'));
      collectedStyles = `${collectedStyles} ${fileContent}`;
    }
  };

  const collectRejectedFile = (filePath: string) => {
    collectedRejectedPaths.push(filePath.replaceAll('\\', '/'));

    fs.writeFileSync(
      cacheRejectedPath,
      JSON.stringify(collectedRejectedPaths, null, 2),
      'utf8',
    );
  };

  return {
    collectStylesFromFile,
    collectStylesFromFileForLaterUsage,
    collectRejectedFile,
  };
};

const regenerateStylesFromCacheIfPossible = () => {
  if (!fs.existsSync(cacheAcceptedPath)) {
    return;
  }

  const cachedPaths = JSON.parse(
    fs.readFileSync(cacheAcceptedPath, 'utf8'),
  ) as unknown as string[];

  if (cachedPaths.length > 0) {
    const { collectStylesFromFile } = createStylesCollector();

    for (const path of cachedPaths) {
      if (!fs.existsSync(path)) {
        pluginLogger.info(
          'The cache file has changed (dependencies were updated). Please run: pnpm website clear, and try again.',
        );

        continue;
      }

      collectStylesFromFile(path, { shouldLogAction: false });
    }
  }
};

const ShadowDomCSS: PluginCreator<ShadowDomCSSOptions> = (
  { filesToAdd, filesToExtractPatterns } = {
    filesToAdd: [],
    filesToExtractPatterns: [],
  },
) => {
  generatedMissingPathsAndFilesIfNeeded();

  if (isFirstPluginCall) {
    pluginLogger.info(
      '🌘 ShadowDomCSS is active.\nTo force a refresh of styles, run: pnpm website clear',
    );

    isFirstPluginCall = false;

    regenerateStylesFromCacheIfPossible();
  }

  const {
    collectStylesFromFile,
    collectStylesFromFileForLaterUsage,
    collectRejectedFile,
  } = createStylesCollector();

  filesToAdd.map(collectStylesFromFileForLaterUsage);

  return {
    postcssPlugin: 'shadow-dom-css',
    Once(root) {
      const inputFile = root.source?.input.file || '';

      const shouldExtract = filesToExtractPatterns.some((namePattern) =>
        inputFile.replaceAll('\\', '/').toLowerCase().includes(namePattern),
      );

      if (!root.source?.input.file) {
        return;
      }

      if (shouldExtract) {
        collectStylesFromFile(root.source.input.file);
      } else {
        collectRejectedFile(root.source.input.file);
      }
    },
  };
};
ShadowDomCSS.postcss = true;

export default function () {
  return {
    name: 'shadow-dom-css-postcss',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        ShadowDomCSS({
          filesToAdd: [
            '../../../ui/dist/index.css',
            '../../../ui/dist/tokens.css',
            '../../../ui/dist/numerals-mode-1.css',
            '../../../ui/dist/primitives-mode-1.css',
          ],
          filesToExtractPatterns: ['@xyflow'],
        }),
      );

      return postcssOptions;
    },
  };
}
