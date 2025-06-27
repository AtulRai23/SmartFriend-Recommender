import { useEffect, useState, useRef } from 'react';
import API from '../api';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphView({ userId }) {
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    if (!userId) return;
    API.get(`/graph/${userId}`).then(res => {
      const g = res.data;
      g.nodes = g.nodes.map(n => ({
        ...n,
        id: n.id,
        name: n.name,
        color: n.id === userId ? 'red' : 'skyblue'
      }));
      g.links = g.links.map(l => ({ ...l, source: l.source, target: l.target }));
      setGraph(g);
    });
  }, [userId]);

  return (
    <div>
      <h3>Social Graph</h3>
      <div style={{ height: '500px' }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graph}
          nodeAutoColorBy="group"
          nodeLabel="name"
          linkDirectionalParticles={2}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = 'black';
            ctx.fillText(label, node.x + 6, node.y + 6);
          }}
        />
      </div>
    </div>
  );
}
