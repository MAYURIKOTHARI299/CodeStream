import React, { useState } from 'react'
import {  Form, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import ShortUniqueId from 'short-unique-id';
import toast from 'react-hot-toast'
import copy from 'copy-to-clipboard';
import { Carousel } from 'react-bootstrap';
import {InfoCircleFill} from 'react-bootstrap-icons'
import Footer from '../components/footer';

const Home = () => {
    const Suid = new ShortUniqueId()
    const history = useNavigate()
    const valt = 'Enter the Session Id', invalt = 'Invalid Session  Id';
    const lenvalt = 'Enter only 10 characters Session Id';
    const [uname, setuname] = useState('')    
    const [fclick, setFclick] = useState(false)
    const [sid, setSid] = useState('')
    const [sid1, setSid1] = useState('')
    const [validText, setvalidText] = useState(valt)
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const [interviewer, setInterviewer] = useState(false)
  

    const handleChange1 = (e) => {
        const input = e.target.value
        if (input && !alphanumericRegex.test(input)) {
            setvalidText(invalt)
            setSid1('')
            return;
        } 
        setvalidText(lenvalt)
        if(input.length>10) {
            setSid1('')
            return
        }
        setSid1(input)
    }

    const handleNameChange = (e) => {
        setuname(e.target.value)
    }

    const generateCode = (e) => {
        e.preventDefault();
        setFclick(true)
        let code  = Suid(10);
        setSid(code)
        setSid1(code)
        if (copy(code))
            toast.success('Session ID copied')
        else toast.error('Cannot copy to clipboard')
    }

    const handleSwitch = (e) => {
        setInterviewer(!interviewer)
        // console.log(interviewer);
    }

    const handleJoin = async (e)=> {
        e.preventDefault()
        if(sid.length===0 && sid1.length===0) {
            toast('Please generate or fill the Session ID', {
                icon: '❕',
              });
            return;
        }
        if(uname.length==0) {
            toast.error("Name field is empty")
            return;
        }
        const roomId = sid.length>0?sid:sid1
        if(sid.length>0) {
            localStorage.setItem('init', 'true')
        }
        toast.success('Joining new Call')
        history(`/call/${roomId}`, {
            state: {
                username: uname,
                interviewer:!interviewer,
            },
        });
    }
    
    return (
        <>
        <div className='main-home'>
            <div className='cen-container'>
                {/* <Image src='/qna.png' className='img-fluid' /> */}
                <div className='lcentral l-shadow mx-auto'>
                <Carousel data-bs-theme="dark" className='fwid '>
                    <Carousel.Item key='1' interval={800}>
                        <img
                        className="d-block w-100   img-fluid"
                        src="https://img.freepik.com/free-vector/developer-activity-concept-illustration_114360-2801.jpg?size=626&ext=jpg&ga=GA1.1.1538103849.1664040435&semt=sph"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h5 className='blk-txt '>Online Compiler</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item key='2' interval={750}>
                        <img alt='face motion' className="d-block w-100 img-fluid" src='https://img.freepik.com/free-vector/cartoon-online-medical-conference_23-2148906039.jpg?size=626&ext=jpg&ga=GA1.1.1538103849.1664040435&semt=ais'/>
                        <Carousel.Caption>
                            <h5 className='blk-txt'>Video Call Proctored</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item key='3' interval={750}>
                        <img alt='video' className="d-block w-100 img-fluid"  src="https://img.freepik.com/free-vector/computer-with-social-media-icons_24877-56554.jpg?size=626&ext=jpg&ga=GA1.1.1538103849.1664040435&semt=ais" />
                        <Carousel.Caption>
                            <h5 className='blk-txt'>Screen Sharing</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item key='4' interval={750}>
                        <img alt='code editor' className="d-block w-100 img-fluid"  src="https://img.freepik.com/free-vector/programmers-concept-with-flat-design_23-2147850105.jpg?size=626&ext=jpg&ga=GA1.1.1538103849.1664040435&semt=ais" />
                        <Carousel.Caption>
                            <h5 className='blk-txt'>Live Code Editor</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item key='5' interval={750}>
                        <img alt='live chat' className="d-block  w-100 img-fluid"  src="https://img.freepik.com/free-vector/happy-man-online-dating-via-laptop_74855-7495.jpg?size=626&ext=jpg&ga=GA1.1.1538103849.1664040435&semt=ais" />
                        <Carousel.Caption>
                            <h5 className='blk-txt'> Live Chat</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                </Carousel>
                </div>
            </div>
            <div className='cen-container'>
                <div className='central r-shadow'>
                    <div className='d-flex flex-column'>
                        <div className='jcontent'>
                            <h3 className='t-color'>Welcome to <span className='myfont'>CodeStream</span></h3>

                        </div>
                        <div className='jcontent mt4'>
                            <h4>Start a New Session</h4>
                            {/* <Form> */}
                                <Form.Group className="mmb fin d-flex" controlId="">
                                    
                                    <Form.Control 
                                        className='genInp' 
                                        type="text" 
                                        placeholder="#uniqueId" 
                                        disabled 
                                        name="sid"
                                        value={sid}
                                    />
                                        <Button className="btn-dark gen-btn"
                                            onClick={generateCode}
                                        >Generate {fclick ? 'Again' : ''}</Button>
                                </Form.Group>
                                <h4>or</h4>
                            
                        </div>
                        <div className='jcontent mt-4'>
                            <h4>Join with Code</h4>
                                <Form.Group className="mmb fin " >
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Id" 
                                        name="sid1"
                                        onChange={handleChange1}
                                        value={sid1}
                                        
                                    />
                                    <Form.Text>{validText}</Form.Text>
                                </Form.Group>
                        </div>
                        <div className='jcontent'>
                                <Form.Group className="mmb fin d-flex" controlId="">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your good Name" 
                       
                                        name="uname"
                                        onChange={handleNameChange}
                                        value={uname}
                                    />
                                </Form.Group>
                                <Form.Group className='ml-2'>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Join as Interviewer "
                                        value={interviewer}
                                        name='interviewer'
                                        onChange={handleSwitch}
                                        style={{display: 'inline', textAlign: 'left !important', padding: '5px'}}
                                    />
                                    <InfoCircleFill className='infoIcon'></InfoCircleFill>
                                    <span className="afterHoverText">Toggle to disable Face Monitoring</span>
                                </Form.Group>
                                <Form.Group className='mt-2'>
                                    <Button onClick={handleJoin}>Join Call</Button>
                                </Form.Group>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='disclaimer'>
            <h5>Note:</h5>
            <p>Sit in well lit room and Face camera to avoid misbehaviour notifications. <br></br>
            If your video is not visible, hard reload the page and rejoin.
            </p>
        </div>
        <Footer ></Footer>
        </>
    )
}

export default Home