import React from 'react';
import { ChatMessage } from '../../types';
import Avatar from '../Common/Avatar';
import { format } from 'date-fns';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isMe = user?.id === message.userId;

  return (
    <div className={clsx("flex gap-3 mb-4", isMe ? "flex-row-reverse" : "flex-row")}>
      <Avatar src={message.userAvatar} name={message.userName} size="sm" className="flex-shrink-0" />
      <div className={clsx(
        "max-w-[75%] rounded-2xl px-4 py-2",
        isMe ? "bg-primary text-white rounded-tr-none" : "bg-dark-lighter border border-dark-border text-gray-200 rounded-tl-none"
      )}>
        {!isMe && <p className="text-xs text-gray-400 mb-1">{message.userName}</p>}
        <p className="text-sm break-words">{message.text}</p>
        <p className={clsx(
          "text-[10px] mt-1 text-right",
          isMe ? "text-primary-100/70" : "text-gray-500"
        )}>
          {format(new Date(message.createdAt), 'h:mm a')}
        </p>
      </div>
    </div>
  );
};

export default Message;
