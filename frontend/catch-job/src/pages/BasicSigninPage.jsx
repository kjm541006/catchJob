import React, { useState,useEffect  } from 'react';
import "../assets/css/BasicSignin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash   } from "@fortawesome/free-regular-svg-icons";


const BasicSigninPage = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCarrers, setSelectedCarrers] = useState([]);
  const [data, setData] = useState([]);

  const handleClick = (e) => {
    const {name} = e.target;

    switch(name){
      case 'email': setEmail(''); break;
      case 'name' : setName(''); break;
      case 'password': setPassword(''); break;
      case 'confirmPassword': setConfirmPassword(''); break;
      default: break;
    } 
  };

  const handleInputChange =(e) => {
    const {name, value} = e.target;

    switch(name){
      case 'email': setEmail(value); break;
      case 'name' : setName(value); break;
      case 'password': setPassword(value); break;
      case 'confirmPassword': setConfirmPassword(value); break;
      default: break;
    } 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleJobCheckboxChange = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const handleCarrerChange = (carrer) => {
    setSelectedCarrers([carrer]);
  };

  const handleData = () => {
    setData([email, name, password,confirmPassword,selectedJobs,selectedCarrers]);
  }
  
  useEffect(() => {
    console.log(selectedJobs);
  }, [selectedJobs]);

  useEffect(() => {
    console.log(selectedCarrers);
  }, [selectedCarrers]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="body-basic">
    <div className="section-basic">
      <div className="entire-box-basic">
        <h1 className="catchJob-basic">
          catch<span className="red-letter">J</span>ob
        </h1>
        
        <div className="input-text-basic">이메일</div>
        <input type="text" className="input-box-basic" tabIndex="1" name="email"
        value={email} onClick={handleClick} onChange={handleInputChange}
        placeholder="이메일을 입력하세요"/>
        <div className="input-text-basic">이름</div>
        <input type="text" className="input-box-basic" tabIndex="2" name="name"
        value={name} onClick={handleClick} onChange={handleInputChange}
        placeholder="이름을 입력하세요"/>
        <div className="input-text-basic">비밀번호</div>
        <div className="input-container-basic">
          <input type={showPassword ? "text" : "password"} className="input-box-basic" tabIndex="3" name="password"
          value={password} onClick={handleClick} onChange={handleInputChange}
          placeholder="비밀번호 입력하세요"/>
          <div className="eye-icon-basic" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </div>
        </div>
        <div className="input-text-basic">비밀번호 확인</div>
        <div className="input-container-basic">
          <input type={showPassword ? "text" : "password"} className="input-box-basic" tabIndex="4" name="confirmPassword"
          value={confirmPassword} onClick={handleClick} onChange={handleInputChange}
          placeholder="비밀번호를 다시 한 번 입력하세요"/>
          <div className="eye-icon-basic" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon = {showPassword ? faEye : faEyeSlash} />
          </div>
        </div>

        <div className="input-text-basic">직무</div>
          <div className="choosejob" id="pick">
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('웹디자이너')}/>
              <div className="choosejob-text-basic">웹디자이너</div>
            </div>
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('웹퍼블리셔')}/>
              <div className="choosejob-text-basic">웹퍼블리셔</div>
            </div>
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('프론트엔드')}/>
              <div className="choosejob-text-basic">프론트엔드</div>
            </div>
          </div>
          <div className="choosejob">
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('백엔드')}/>
              <div className="choosejob-text-basic">백엔드</div>
            </div>
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('PM')}/>
              <div className="choosejob-text-basic">PM</div>
            </div>
            <div className="choosejobone">
              <input type="checkbox" className="custom-checkbox" onChange={() => handleJobCheckboxChange('기타')}/>
              <div className="choosejob-text-basic">기타</div>
            </div>
          </div>

        <div className="input-text-basic">경력 여부</div>
        <div className="choosejob" id="pick">
            <div className="choosejobone" id="carrer">
              <input type="radio" className="custom-checkbox"  name="job"  onChange={() => handleCarrerChange('신입')}/>
              <div className="choosejob-text-basic">신입</div>
            </div>
            <div className="choosejobone" id="carrer">
              <input type="radio" className="custom-checkbox" name="job" onChange={() => handleCarrerChange('경력')}/>
              <div className="choosejob-text-basic">경력</div>
            </div>
        </div>

        <div className="enrollbutton">
          <button className="cancel-basic">취소</button>
          <button className="enroll-basic" onClick={handleData} >등록</button>
        </div>

        <div className="log-in-basic">
            <div className="entire-text-basic">이미 계정이 있으신가요?</div>
            <button className="log-in-now-basic">로그인 하기</button>
          </div>   
      </div>   
    </div>
  </div>
  );
};

export default BasicSigninPage;