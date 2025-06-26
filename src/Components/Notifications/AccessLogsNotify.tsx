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
    const [_ws, setWs] = useState<WebSocket | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const websocket = new WebSocket(props.url)
        setWs(websocket)

        websocket.onmessage = (event) => {
            const message = event.data
            setIsAccess(message == "1")
            dispatch(getAccessLogs(1))
        }


        websocket.onclose = (event) => {
            if (!event.wasClean) {
                console.log('WebSocket соединение прервано')
                setTimeout(() => {
                    setWs(new WebSocket(props.url))
                }, 5000)
            }
        }

        return () => {
            websocket.close()
        }
    }, [props.url, dispatch])
    
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