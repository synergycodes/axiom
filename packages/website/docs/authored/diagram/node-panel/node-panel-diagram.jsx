function Page() {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 150 },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 450, y: 150 },
    },
  ]);

  const nodeTypes = useMemo(
    () => ({
      custom: Node,
    }),
    [],
  );

  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge(params, edges));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </ReactFlowProvider>
    </div>
  );
}
