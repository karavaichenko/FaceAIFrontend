import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../Store/hooks'
import s from './Notifications.module.css'
import { getAccessLogs } from '../../Store/accessLogReducer'
import { Button } from 'antd'

type PropsType = {
    url: string
}

const AccessLogsNotify = (props: PropsType) => {

    const [isAccess, setIsAccess] = useState(true)
    const dispatch = useAppDispatch()
    useEffect(() => {

        const ws = new WebSocket(props.url)
        ws.onmessage = (event) => {
            debugger
            const message = event.data;
            setIsAccess(message == "1")
            dispatch(getAccessLogs(1))
        }

    }, [props.url])
    
    if (!isAccess) {
        return (
            <div className={s.container}>
                <div className={s.form_container}>
                    Прибыл неизвестный сотрудник
                    <Button type='primary' size='large' onClick={() => {setIsAccess(true)}}>ОК</Button>
                </div>
            </div>
        )
    } else {
        return <div>

        </div>
    }
}

export default AccessLogsNotify