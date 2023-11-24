import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/generate-paper');
  })
  
  return (
    <div className="">
      
    </div>
  );
}

export default App;
