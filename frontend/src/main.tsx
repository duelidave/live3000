import app from 'apprun';
import Navigation from './layouts/Navigation';
import Footer from './layouts/Footer';

const mainContainer = 'live-3000';
const state = "Home"

const view = (state) => <div>
    <Navigation></Navigation>
    {state}
    <Footer></Footer>
</div>;

const update = {
    "#Home" : state => state
};

app.start(mainContainer, state, view, update);

app.on('#', _ => app.run('#Home'))

app.on('#Profile', async () => {
    const module = await import('./modules/Profile');
    new module.default().start(mainContainer);
})

app.on('#Login', async () => {
    const module = await import('./modules/auth/Login');
    new module.default().start(mainContainer);
})
