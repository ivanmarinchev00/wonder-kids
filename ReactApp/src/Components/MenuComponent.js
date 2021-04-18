import Button from 'react-bootstrap/Button';
import {Link,withRouter} from 'react-router-dom';

const MenuComponent = props => {

    const handleLogout = e =>{
        props.history.push("/")
        sessionStorage.clear()
    }

return (
<div class="container-fluid ">
        <div class="row justify-content-center">
            <h2 class="sign">Hello there!
                Ready to learn and have fun?</h2>
        </div>

        <Link className="link" to="articles">
        <div class="row justify-content-center">
            <button type="button" className="col-8 col-lg-4 col-md-4 col-sm-2 btn-primary btn-lg btn">Articles</button>
        </div>
        </Link>   
        
        <Link className="link" to="/game">
        <div class="row justify-content-center">
            <button type="button" className="col-8 col-lg-4 col-md-4 col-sm-2 btn-primary btn-lg btn">Play Game</button>
        </div>
        </Link>

        <Link className="link" to="/conversations">
        <div class="row justify-content-center">
            <button type="button" className="col-8 col-lg-4 col-md-4 col-sm-2 btn-primary btn-lg btn">Conversations</button>
        </div>
        </Link>

      
        <div class="row justify-content-center">
            <button type="button" className="col-8 col-lg-4 col-md-4 col-sm-2 btn-primary btn-lg btn" onClick = {handleLogout}>Logout</button>
        </div>

       
        
        
        
    </div>
)
}
export default withRouter(MenuComponent);
