import { Link } from 'react-router-dom';

function Button({ children, to, onClick, variant = 'primary', className = '', ...props }) {
  const classes = `btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
