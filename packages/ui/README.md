# @synergycodes/axiom

A React library for creating node-based user interfaces and diagram-driven apps. Built to work seamlessly with React Flow, it provides a collection of ready-to-use components and templates that simplify the development of visual editors, workflows, and interactive diagrams.

Developed and maintained by **[Synergy Codes](https://www.synergycodes.com/)**.

## Quick Start: 3-Minute Guide

### 📦 Installation

Use one of the commands below to add **Axiom** to your project:

```bash
npm install @synergycodes/axiom
```

```bash
pnpm add @synergycodes/axiom
```

```bash
yarn add @synergycodes/axiom
```

### 🎨 Import styles

Add to your style sheet or component:

```css
@import '@synergycodes/axiom/tokens.css';
```

```tsx
import '@synergycodes/axiom/tokens.css';
```

### 🎛️ Apply the Theme
Wrap the section of your app that uses Axiom components in a container with a `data-theme` attribute and use one of the available theme values: `dark` or `light`.

```tsx
<div data-theme="dark">
  <YourApp />
</div>
````

Or set it on the `<html>` or `<body>` element.

You can dynamically switch themes by changing the `data-theme` attribute at runtime.

### 🧱 Use components

```tsx
import { Input } from '@synergycodes/axiom';

// …

<Input value={value} onChange={onChange} />;
```

## Overview

Forget cobbling together UI kits with diagram libraries. Axiom provides a unified set of designed, ready-to-use components: buttons, inputs, accordions, node templates, and more — all built to work seamlessly together.

## Features

- Unified Component System: Seamlessly integrated UI and diagram components
- Ready-to-use Components: Comprehensive set of pre-built components
- Token-based Customization: Easy theming through CSS variables
- Developer-friendly: Focus on developer experience and productivity
- React Flow Compatible: Perfect for React Flow users with pre-built node templates that match React Flow's styling

## Customization

Each Axiom component uses CSS variables that are derived from primitive values.

You can override them:

```css
:root {
  --ax-ui-bg-primary-default: #40ba12;
}
```

or a derived value used by the selected component:

```css
:root {
  --ax-public-date-picker-dropdown-background: #40ba12;
}
```

### Axiom css layers

Axiom uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to separate its styles from yours. By default, CSS styles outside of any layer take precedence over what Axiom defines, so your styles will always win the specificity war. You can customize Axiom components with simple `input {}`.


```css
@layer ui.component {
  .separator {
    /* … */
  }
}
```

Default Axiom order:
```css
@layer ui.base, ui.component;
```

### 📣 Important Note on Underlying Technology

> **Axiom is built on top of [MUI Base](https://v6.mui.com/base-ui/getting-started/), a headless component library that focuses on accessibility and logic, while leaving the styling up to us.**
>
> Thanks to MUI Base, Axiom provides components that are **accessible by default** and **fully customizable** through our design tokens.
>
> We are aware that **MUI Base has been deprecated**, and the MUI team recommends migrating to [Base UI](https://base-ui.com).
> However, after careful evaluation, we’ve chosen to **stay with MUI Base** for now because:
>
> * ✅ **Base UI is not yet mature enough** for our needs.
> * ✅ We want to ensure a stable, well-tested experience for Axiom users.
>
> This is a **conscious and informed decision**.
> We will continue to monitor Base UI’s progress and will consider migrating when we feel it’s the right time, ensuring a smooth and thoughtful transition for Axiom users.
>
> If you have any questions or concerns, feel free to reach out — we’re happy to share our reasoning and plans in more detail!

## Showcase

**[Workflow Builder](https://www.workflowbuilder.io/)** is a frontend-focused starter app for building workflows, offering core features, best practices, and easy backend integration for faster client delivery.

https://www.workflowbuilder.io/
