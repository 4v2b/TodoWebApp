
import "../App.css";

export default function WideButton({content}){
    return (
        <input className="defButton" type="button" value={content}/>
    );
}