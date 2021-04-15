import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const MenuComponent = props => {
return (
<div class="container-fluid ">
        <div class="row justify-content-center">
            <h2 class="sign">Hello there!
                Ready to learn and have fun?</h2>
        </div>

        <Link to="articles">
        <div class="row justify-content-center">
            <button type="button" className="btn-primary btn-lg btn">Articles</button>
        </div>
        </Link>   
        
        <Link to="/game">
        <div class="row justify-content-center">
            <button type="button" className="btn-primary btn-lg btn">Play Game</button>
        </div>
        </Link>

        <Link to="/conversations">
        <div class="row justify-content-center">
            <button type="button" className="btn-primary btn-lg btn">Conversations</button>
        </div>
        </Link>

        <Link to="logout">
        <div class="row justify-content-center">
            <button type="button" className="btn-primary btn-lg btn">Logout</button>
        </div>
        </Link>

       
        
        
        
    </div>
)
}
export default MenuComponent;
