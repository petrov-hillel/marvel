import error from './error.gif'

export default function ErrorMessage() {
    return(
        <img style={{
            display: 'block',
            width: 250,
            height: 250,
            objectFit: 'contain',
            margin: '0 auto'
        }} src={error} alt={'error'}/>
    )
}