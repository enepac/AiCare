"use client";

import * as React from "react"; // ✅ Fixes TypeScript import issues
import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";

// Define the widget type for Drag & Drop
const WIDGET_TYPE = "widget"; // ✅ Ensure this is defined here

// Props Interface
interface DraggableWidgetProps {
  id: string;
  index: number;
  moveWidget: (fromIndex: number, toIndex: number) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  children: React.ReactNode;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  index,
  moveWidget,
  isCollapsed,
  toggleCollapse,
  children
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Define drag behavior using react-dnd
  const [{ isDragging }, drag] = useDrag({
    type: WIDGET_TYPE, // ✅ Make sure type is consistent with the defined WIDGET_TYPE
    item: { id, index }, // Pass necessary data for dragging
    collect: (monitor) => ({
      isDragging: monitor.isDragging() // Track drag status
    })
  });

  const [, drop] = useDrop({
    accept: WIDGET_TYPE, // Accept only items of type WIDGET_TYPE
    hover: (draggedItem: { index: number }) => {
      // Handle hover behavior for rearranging
      if (draggedItem.index !== index) {
        moveWidget(draggedItem.index, index); // Move the widget when dragged
        draggedItem.index = index; // Update the index
      }
    }
  });

  // Apply drag & drop using useEffect and ensure ref is properly assigned
  useEffect(() => {
    if (ref.current) {
      drag(drop(ref.current)); // Connect drag and drop to the element
    }
  }, [drag, drop]);

  return (
    <motion.div
      ref={ref} // ✅ Correctly assign the ref for drag-and-drop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 bg-white rounded-lg shadow-md cursor-move transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Widget Header */}
      <div className="flex justify-between items-center">
        <button onClick={toggleCollapse} className="text-gray-600 hover:text-gray-800">
          {isCollapsed ? "🔼 Expand" : "🔽 Collapse"}
        </button>
      </div>
      {/* Widget Content */}
      {!isCollapsed && children} {/* Render children when not collapsed */}
    </motion.div>
  );
};

export default DraggableWidget;
