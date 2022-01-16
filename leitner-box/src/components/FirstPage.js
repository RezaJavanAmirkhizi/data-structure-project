import {Link} from 'react-router-dom';

const FirstPage = () => {

    return (
        <div className="container">
            <h1>زبان آموز</h1>
            <p>.وبسایت زبان آموز بستری برای یادگیری زبان انگلیسی بر پایه جعبه لایتنر میباشد</p>
            <Link className="link" to="/Learn">بزن بریم</Link>
        </div>
    )

}

export default FirstPage;