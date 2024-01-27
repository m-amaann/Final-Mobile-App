import React from 'react';
import "../../CSS/Modal.css";

function ReportInput({ size, onSizeChange, onSizeRemove }) {
  return (
    <div className="form-group mb-3 mr-1 d-flex justify-content-between">
      <input
        type="text"
        className="form-control"
        style={{ boxShadow: 'none', width:'110px' }}
        name="size"
        value={size}
        onChange={onSizeChange}
      />
      <button type="button" onClick={onSizeRemove} className='btn Remove-Btn'>Remove</button>
    </div>
  );
}

export default ReportInput;
