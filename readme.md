# NextJS with Redux, JWT Auth, Express API & Multilanguage boilerplate

**Features**

* ↔ Universal state (Keeping state on the server and the client in sync)
     * build with `next-redux-wrapper@6.0.2`

* 🌏 Multilanguage ([see Filip Wojciechowski tutorial](https://medium.com/swlh/how-to-build-a-multilingual-website-in-next-js-2924eeb462bc))
     * locale subpaths
     * server side rendering
     * simple automatic language detection
     * ability to save/restore user language preferences
     * translations

* 🔗 [Custom Link](#custom-link-component) component to handle localized routes

- 📐 Custom Server with Express to build API in the same project

![Demo](screenshot.png?raw=true "Demo")


## Installation

```bash
npm install
```
### Development
```bash
npm run dev
```

### Production
```bash
npm run build && npm run start
```

## Usage
### Custom Link component
```
import Layout from '../../components/layout/Layout';
import LocaleLink from '../../components/shared/Link';

const ExamplePage = () => {
   
    return(
        <Layout>
            <button>
                <LocaleLink href="signup">Link signup page</LocaleLink>
            </button>
        </Layout>
    )
}
```

## Contributing
Pull requests are welcome.


## License
[MIT](https://choosealicense.com/licenses/mit/)