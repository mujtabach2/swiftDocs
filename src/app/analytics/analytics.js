"use client"

import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import Quote from '../components/qoute'; // Keeping the spelling as per your request

const SankeyChart = ({ data }) => { 
  // Define the links based on the data provided
  const links = [ 
    {
      source: 'Jobs Applied',
      target: 'Interviews',
      value: data.interviews,
      type: 'Applied to Interviewed',
      color: '#1f77b4',
    },
    {
      source: 'Interviews',
      target: 'Offers',
      value: data.offers,
      type: 'Interviewed to Offered',
      color: '#ff7f0e',
    },
    {
      source: 'Offers',
      target: 'Hired',
      value: data.hired,
      type: 'Offered to Hired',
      color: '#2ca02c',
    },
    {
      source: 'Jobs Applied',
      target: 'Rejected',
      value: data.rejected,
      type: 'Applied to Rejected',
      color: '#d62728',
    },
    {
      source: 'Offers',
      target: 'Rejected Offers',
      value: data.rejectedOffers,
      type: 'Offered to Rejected Offers',
      color: '#e377c2', // Updated color
    },
  ];
  
  // Extract unique node IDs from the links to create nodes
  const nodeIds = Array.from(
    new Set(links.flatMap(link => [link.source, link.target]))
  );

  // Assign specific colors to nodes based on their IDs
  const nodeColors = {
    'Jobs Applied': '#1f77b4',
    'Interviews': '#ff7f0e',
    'Offers': '#2ca02c',
    'Hired': '#d62728',
    'Rejected': '#9467bd',
    'Rejected Offers': '#e377c2', // Added color for Rejected Offers
  };

  // Create nodes array with assigned colors
  const nodes = nodeIds.map(id => ({
    id,
    nodeColor: nodeColors[id] || '#888888', // Default color if not specified
  }));

  // Combine nodes and links into the SankeyData structure expected by Nivo
  const sankeyData = {
    nodes,
    links,
  };

  return (
    <div className="w-full h-96 mb-8">
      <h2 className="text-xl font-semibold mb-2">Job Application Flow</h2>
      <div className="h-80">
        <ResponsiveSankey
          data={sankeyData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          align="justify"
          colors={link => link.nodeColor || '#888888'} // Corrected to use link.color
          nodeThickness={13}
          nodeBorderWidth={0}
          linkBlendMode="multiply"
          linkOpacity={0.25}
          linkHoverOthersOpacity={0.1}
          linkContract={35} // Changed from string to number
          enableLinkGradient={true}
          label={node => `${node.id}`} // Simplified label
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={10}
          labelTextColor={"black"}
          animate={true}
          motionConfig="gentle"
        />
      </div>
      {/* Added Quote Component */}
      <Quote />
    </div>
  );
};

export default SankeyChart;
