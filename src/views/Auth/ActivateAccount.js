import { useHistory, useParams } from 'react-router-dom'
import {  Check, X } from 'react-feather'
import '@styles/react/pages/page-authentication.scss'
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner'
import { useEffect } from 'react'
import axios from 'axios'
import { Slide, toast } from 'react-toastify'
import env from 'react-dotenv'
import Avatar from '@components/avatar'

const ActivateAccount = () => {
    const {hash} = useParams()
    const history = useHistory()

    useEffect(() => {
        (async function Activation() {
            try {
                const url = `${env.API_URL}/auth/activate/hash/${hash}`
                await axios.post(url)
                history.push("/")
                toast.success(
                    <div className="toastify-header">
                        <div className="title-wrapper">
                            <Avatar size="sm" color="success" icon={<Check size={12} />} />
                            <h6 className="toast-title fw-bold">Compte activé avec succés</h6>
                        </div>
                        </div>,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            } catch (error) {
                history.push("/")
                toast.error(
                    <div className="toastify-header">
                        <div className="title-wrapper">
                            <Avatar size="sm" color="danger" icon={<X size={12} />} />
                            <h6 className="toast-title fw-bold">Lien non valid</h6>
                        </div>
                        </div>,
                    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            }
            
        })()
    }, [])
    
    return <SpinnerComponent />
    
}

export default ActivateAccount
