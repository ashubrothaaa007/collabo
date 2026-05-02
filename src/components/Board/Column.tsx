import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task, Status } from '../../types';
import TaskCard from './TaskCard';
import clsx from 'clsx';
import { Plus } from 'lucide-react';

interface ColumnProps {
  title: Status;
  tasks: Task[];
  onAddTask: (status: Status) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onAddTask }) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-80 bg-dark-lighter/50 rounded-xl h-full border border-dark-border overflow-hidden">
      <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="bg-dark text-gray-400 text-xs px-2 py-0.5 rounded-full border border-dark-border">
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={() => onAddTask(title)}
          className="text-gray-400 hover:text-white hover:bg-dark p-1 rounded transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              "flex-1 p-3 overflow-y-auto min-h-[150px] transition-colors",
              snapshot.isDraggingOver ? "bg-dark/80" : ""
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
