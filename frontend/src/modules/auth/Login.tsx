import app, {Component, on} from "apprun";
import Navigation from '../../layouts/Navigation';
import Footer from '../../layouts/Footer';
import {auth, serializeObject} from "../../api";
import {IUser} from "../../model/Models";

export default class extends Component {
    state = 'Login';
    view = (state) => {
        return <div>
            <Navigation></Navigation>
            <div>
                <form onsubmit={e => this.run('sign-in', e)}>
                    <fieldset class="form-group">
                        <label>E-Mail:</label>
                        <input type="text" class="form-control form-control-lg" name="email" />
                    </fieldset>
                    <fieldset class="form-group">
                        <label>Passwort:</label>
                        <input type="password" class="form-control form-control-lg" name="password" />
                    </fieldset>
                    <button class="btn btn-primary mb-2" type="submit">Login</button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    };
    
    update = {
        '#Login': state => state,
    }
    
    @on("sign-in")
    signIn = async (state, e) => {
        try {
            e.preventDefault();
            let user = serializeObject(e.target);
            console.log(user);
            console.log(user['email']);
            console.log(user['password']);
            const session = await auth.signIn(user['email'], user["password"]);
            //console.log(session)
        }
        catch ({errors})
        {
            console.log(errors);
        }
    }
}