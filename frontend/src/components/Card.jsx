function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`card-surface ${hover ? 'card-hover' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
