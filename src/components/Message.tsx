import './Message.css';

function Message({ text }: { text: string }) {
  return (
    <div className="message-wrapper">
      <div className="message">{text}</div>
    </div>
  );
}

export default Message;
