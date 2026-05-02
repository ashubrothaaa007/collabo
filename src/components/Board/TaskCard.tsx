import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types';
import { Clock, MessageSquare, Paperclip } from 'lucide-react';
import Avatar from '../Common/Avatar';
import clsx from 'clsx';
import { formatDate, isOverdue } from '../../utils/helpers';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const overdue = task.status !== 'Done' && isOverdue(task.dueDate);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'bg-dark rounded-lg p-4 border mb-3 group cursor-grab active:cursor-grabbing',
            snapshot.isDragging ? 'border-primary shadow-xl scale-105 z-50 ring-2 ring-primary/20' : 'border-dark-border shadow hover:border-gray-600 transition-colors'
          )}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2 flex-wrap">
              {task.label && (
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-dark-lighter text-gray-300 border border-dark-border">
                  {task.label}
                </span>
              )}
              <span className={clsx(
                "text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded border",
                task.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                'bg-accent/10 text-accent border-accent/20'
              )}>
                {task.priority}
              </span>
            </div>
            <Avatar src={task.assigneeAvatar} name={task.assigneeName} size="sm" />
          </div>

          <h4 className="text-sm font-medium text-white mb-2 leading-snug group-hover:text-primary transition-colors">
            {task.title}
          </h4>

          <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 hover:text-white transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>0</span>
              </div>
              <div className="flex items-center gap-1 hover:text-white transition-colors">
                <Paperclip className="w-3.5 h-3.5" />
                <span>0</span>
              </div>
            </div>
            {task.dueDate && (
              <div className={clsx(
                "flex items-center gap-1 px-1.5 py-0.5 rounded",
                overdue ? "text-red-400 bg-red-500/10" : ""
              )}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
