import { useNavigate } from 'react-router-dom';

import Button from './Button';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        type="back"
        onClick={(event) => {
          event.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}
