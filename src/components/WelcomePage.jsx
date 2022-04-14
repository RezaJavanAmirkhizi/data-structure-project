import {Link} from 'react-router-dom';




const FirstPage = (props) => {

    const storeData = () =>{
        if(JSON.parse(localStorage.getItem('words')) === null) {
            localStorage.setItem('words', JSON.stringify(props.words));
        }
        props.setWords(JSON.parse(localStorage.getItem('words')));
        console.log(props.words);
    }

    return (
        <div className="container">
            <h1>زبان آموز</h1>
            <p>.وبسایت زبان آموز بستری برای یادگیری زبان انگلیسی بر پایه جعبه لایتنر میباشد</p>
            <Link onClick={() => storeData()} className="link" to="/secondpage">بزن بریم</Link>
        </div>
    );
}

export default FirstPage;