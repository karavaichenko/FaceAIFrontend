import s from './ErrorsPages.module.css'

const ServerDisable = () => {
    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <h3>Кажется сервер временно недоступен...</h3>
            </div>
        </div>
    )
}

export default ServerDisable