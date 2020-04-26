import app, {Component} from "apprun";
export default class extends Component {
    state = 'Profile';
    view = (state) => {
        return <div>
            <h1>{state}</h1>
        </div>
    };
    
    update = {
        '#Profile': state => state,
    }
}