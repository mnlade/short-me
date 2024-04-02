const Spinner: React.FC = () => (
    <div style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid rgba(0, 0, 0, 0.3)',
      borderTopColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite',
      verticalAlign: 'middle',
    }} />
  );
  
  export default Spinner;