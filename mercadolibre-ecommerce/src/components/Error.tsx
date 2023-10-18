import './error.sass'
interface Props {
    props: string
}
export function Error({props}: Props) {
    return (
        <div className='cardError'>
            <header>
                <p>&#9888;</p>
            </header>
            <main>
                <p>
                    {props}
                </p>
            </main>
        </div>
    )
}