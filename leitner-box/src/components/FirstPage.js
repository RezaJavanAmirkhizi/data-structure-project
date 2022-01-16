import {Link} from 'react-router-dom';


const FirstPage = (props) => {

    const storeData = () =>{
        localStorage.setItem('words', JSON.stringify(props.words));
    }

    return (
        <div className="container">
            <h1>زبان آموز</h1>
            <p>.وبسایت زبان آموز بستری برای یادگیری زبان انگلیسی بر پایه جعبه لایتنر میباشد</p>
            <Link onClick={() => storeData()} className="link" to="/Learn">بزن بریم</Link>
        </div>
    )

}

export default FirstPage;