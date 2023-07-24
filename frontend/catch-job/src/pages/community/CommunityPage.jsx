import React, { useEffect, useState } from "react";
import "../../assets/css/CommunityPage.css";
import Modal from "./CommunityModal";
import PostModal from "./CommunityPostModal";
import "../../assets/css/CommunityPostModal.css";
import Heart from "../../assets/img/heart.svg";
import Noheart from "../../assets/img/noheart.svg";
import axios from "axios";

function Card(props) {
  const [commentModalOpen, setCommentModalOpen] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [expanded, setExpanded] = useState([]);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const data = [
    {
      community_id: 1,
      profileImg: "https://example.com/profile1.jpg",
      member_id: "User1",
      c_date: "2023-07-17",
      c_type: "기술 질문",
      c_title: "React 관련 질문",
      c_contents: "React에서 상태 관리는 어떻게 하는 것이 좋을까요?",
      c_like: false,
      comment: [
        { c_com_id: 1, member_id: "User2", c_com_content: "React의 상태 관리는 주로 Redux나 Context API를 사용합니다." },
        {
          c_com_id: 2,
          member_id: "User3",
          c_com_content: "제 경험에 따르면 Redux가 상대적으로 복잡하지만 큰 규모의 애플리케이션에서 유용하게 사용될 수 있습니다.",
        },
      ],
    },

    // 추가적인 데이터를 여기에 추가할 수 있습니다.
  ];

  const [communityData, setCommunityData] = useState(data);

  // Function to fetch community data from the server
  const fetchCommunityData = async () => {
    try {
      const response = await axios.get("localhost:8089/community"); //replace "api/community" actual API endpoint
      setCommunityData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [selectedCategory]);

  // Function to toggle comment modal and show/hide comments for a post
  const toggleCommentModal = (i) => {
    setCommentModalOpen((prevCommentModalOpen) => {
      const newCommentModalOpen = [...prevCommentModalOpen];
      newCommentModalOpen[i] = !newCommentModalOpen[i];
      return newCommentModalOpen;
    });
    setShowComments((prevShowComments) => {
      const newShowComments = [...prevShowComments];
      newShowComments[i] = !newShowComments[i];
      return newShowComments;
    });
  };

  const toggleExpanded = (i) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[i] = !newExpanded[i];
      return newExpanded;
    });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (i) => {
    const newComment = { id: Date.now(), content: comment };
    const postId = filteredData[i].id;

    try {
      const response = await axios.post(`localhost:8089/community/${postId}/comments`, newComment);
      setCommunityData((prevData) => {
        const newData = [...prevData];
        const postIndex = newData.findIndex((post) => post.id === postId);
        newData[postIndex].comment.push(response.data);
        return newData;
      });
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const togglePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };

  const handlePostSubmit = async (newPost) => {
    try {
      const response = await axios.post("localhost:8089/community/insert", newPost);
      setCommunityData((prevData) => [...prevData, newPost]);
      togglePostModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory === "전체" ? communityData : communityData.filter((post) => post.category === selectedCategory);

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  const renderComments = (comments) => {
    if (comments.length === 0 || !showComments) {
      return null;
    }

    return (
      <>
        <div className="commentsContainer">
          {comments.map((comment) => (
            <div key={comment.c_com_id} className="commentment">
              <div className="commentmentuser">
                <div>
                  <img src={comment.profileImg} alt="프로필" />
                  {comment.member_id}
                </div>
                <div className="commenteditBtn">
                  <span style={{ color: "#77BC1F" }} onClick={() => handleEditComment(comment.id)}>
                    수정
                  </span>
                  <span style={{ color: "#E2432E" }} onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </span>
                </div>
              </div>

              <div className="commentmentment">
                <p>{comment.c_com_content}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`localhost:8089/community/${postId}/like`);
      setCommunityData((prevData) => {
        const newData = prevData.map((post) => {
          if (post.community_id === postId) {
            return { ...post, c_like: response.data.like };
          }
          return post;
        });
        return newData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = (commentId) => {
    // 수정 기능을 구현하는 로직을 작성합니다.
    // commentId를 기반으로 해당 댓글을 수정하는 작업을 수행합니다.
  };

  const handleDeleteComment = (commentId) => {
    // 삭제 기능을 구현하는 로직을 작성합니다.
    // commentId를 기반으로 해당 댓글을 삭제하는 작업을 수행합니다.
  };

  return (
    <div className="communityCenter">
      <div className="communitySection">
        {filteredData.map((post, i) => (
          <div key={post.community_id} className="communityCard" style={{ borderBottom: "1px solid #E2E8F0" }}>
            <div className="userSection">
              <div>
                <img src={post.profileImg} alt="프로필" />
              </div>
              <div>유저닉네임: {post.member_id}</div>
              <div>시간: {post.c_date}</div>
            </div>

            <div className="cardContentsComponents">
              <div className="cardContentsComponents_Title">
                <span className="contentpostCategory">{post.c_type}</span>
                <h3>{post.c_title}</h3>
              </div>

              <div>
                <div className={`cardContentsComponents_TextArea ${expanded[i] ? "expanded" : ""}`}>
                  <p>
                    {expanded[i]
                      ? post.c_contents.split("\n").map((line) => {
                          // 펼칠때
                          return (
                            <span>
                              {line}
                              <br />
                            </span>
                          );
                        })
                      : truncateContent(
                          post.c_contents.split("\n").map((line) => {
                            // 접힐때
                            return (
                              <span>
                                {line}
                                <br />
                              </span>
                            );
                          }),
                          100
                        )}
                  </p>
                </div>
                {post.c_contents.length > 100 && (
                  <div className="cardContentsComponents_morebutton">
                    <span className="moreButton" onClick={() => toggleExpanded(i)}>
                      {expanded[i] ? "닫기" : "펼치기"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="cardContentsComponents_bottom">
                <div className="heart_img" onClick={() => handleLike(post.community_id)}>
                  {post.like ? <img src={Heart} alt="하트" /> : <img src={Noheart} alt="비어있는 하트" />}
                </div>

                <span className="ment" onClick={() => toggleCommentModal(i)}>
                  {showComments[i] ? "댓글 닫기" : "댓글"}
                </span>
              </div>
              {commentModalOpen[i] && (
                <>
                  <Modal
                    onCommentSubmit={() => handleSubmitComment(i)}
                    onCancel={toggleCommentModal}
                    comment={comment}
                    onCommentChange={handleCommentChange}
                  />
                  <div className="commentContainer">{renderComments(post.comment)}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="jacksung">
        <div>
          <button className="writeButton" onClick={togglePostModal}>
            글작성하기
          </button>

          <div className="ccategory">
            <div>
              <div className="ccategoryimg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 6.5C5 5.94772 4.55228 5.5 4 5.5C3.44772 5.5 3 5.94772 3 6.5C3 7.05228 3.44772 7.5 4 7.5C4.55228 7.5 5 7.05228 5 6.5ZM21 6.5C21 5.94772 20.5523 5.5 20 5.5H8C7.44772 5.5 7 5.94772 7 6.5C7 7.05228 7.44772 7.5 8 7.5H20C20.5523 7.5 21 7.05228 21 6.5ZM21 12.5C21 11.9477 20.5523 11.5 20 11.5H8C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H20C20.5523 13.5 21 13.0523 21 12.5ZM7 18.5C7 17.9477 7.44772 17.5 8 17.5H20C20.5523 17.5 21 17.9477 21 18.5C21 19.0523 20.5523 19.5 20 19.5H8C7.44772 19.5 7 19.0523 7 18.5ZM3 12.5C3 11.9477 3.44772 11.5 4 11.5C4.55228 11.5 5 11.9477 5 12.5C5 13.0523 4.55228 13.5 4 13.5C3.44772 13.5 3 13.0523 3 12.5ZM5 18.5C5 17.9477 4.55228 17.5 4 17.5C3.44772 17.5 3 17.9477 3 18.5C3 19.0523 3.44772 19.5 4 19.5C4.55228 19.5 5 19.0523 5 18.5Z"
                    fill="#94A3B8"
                  />
                </svg>{" "}
                <span
                  style={{ fontSize: 24 }}
                  onClick={() => handleCategoryClick("전체")}
                  className={selectedCategory === "전체" ? "active" : ""}
                >
                  전체
                </span>
              </div>
            </div>
            <div className="ccategoryimg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.87868 3.37868C3.44129 2.81607 4.20435 2.5 5 2.5H19C19.7957 2.5 20.5587 2.81607 21.1213 3.37868C21.6839 3.94129 22 4.70435 22 5.5V15.5C22 16.2957 21.6839 17.0587 21.1213 17.6213C20.5587 18.1839 19.7957 18.5 19 18.5H15.5308L15.903 19.9888L16.7071 20.7929C16.9931 21.0789 17.0787 21.509 16.9239 21.8827C16.7691 22.2564 16.4045 22.5 16 22.5H8C7.59554 22.5 7.2309 22.2564 7.07612 21.8827C6.92134 21.509 7.0069 21.0789 7.29289 20.7929L8.09704 19.9888L8.46922 18.5H5C4.20435 18.5 3.44129 18.1839 2.87868 17.6213C2.31607 17.0587 2 16.2956 2 15.5V5.5C2 4.70435 2.31607 3.94129 2.87868 3.37868ZM4 14.5V15.5C4 15.7652 4.10536 16.0196 4.29289 16.2071C4.48043 16.3946 4.73478 16.5 5 16.5H19C19.2652 16.5 19.5196 16.3946 19.7071 16.2071C19.8946 16.0196 20 15.7652 20 15.5V14.5H4ZM20 12.5H4V5.5C4 5.23478 4.10536 4.98043 4.29289 4.79289C4.48043 4.60536 4.73478 4.5 5 4.5H19C19.2652 4.5 19.5196 4.60536 19.7071 4.79289C19.8946 4.98043 20 5.23478 20 5.5V12.5ZM10.5308 18.5L10.0308 20.5H13.9692L13.4692 18.5H10.5308Z"
                  fill="#CBD5E1"
                />
              </svg>
              <span onClick={() => handleCategoryClick("기술 질문")} className={selectedCategory === "기술 질문" ? "active" : ""}>
                기술 질문
              </span>
            </div>
            <div className="ccategoryimg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                  d="M9 11.5C8.44772 11.5 8 11.9477 8 12.5C8 13.0523 8.44772 13.5 9 13.5H9.01C9.56228 13.5 10.01 13.0523 10.01 12.5C10.01 11.9477 9.56228 11.5 9.01 11.5H9Z"
                  fill="#CBD5E1"
                />
                <path
                  d="M12 11.5C11.4477 11.5 11 11.9477 11 12.5C11 13.0523 11.4477 13.5 12 13.5H15C15.5523 13.5 16 13.0523 16 12.5C16 11.9477 15.5523 11.5 15 11.5H12Z"
                  fill="#CBD5E1"
                />
                <path
                  d="M9 15.5C8.44772 15.5 8 15.9477 8 16.5C8 17.0523 8.44772 17.5 9 17.5H9.01C9.56228 17.5 10.01 17.0523 10.01 16.5C10.01 15.9477 9.56228 15.5 9.01 15.5H9Z"
                  fill="#CBD5E1"
                />
                <path
                  d="M12 15.5C11.4477 15.5 11 15.9477 11 16.5C11 17.0523 11.4477 17.5 12 17.5H15C15.5523 17.5 16 17.0523 16 16.5C16 15.9477 15.5523 15.5 15 15.5H12Z"
                  fill="#CBD5E1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 2.5C10.2044 2.5 9.44129 2.81607 8.87868 3.37868C8.55928 3.69808 8.31933 4.0821 8.17157 4.5H7C6.20435 4.5 5.44129 4.81607 4.87868 5.37868C4.31607 5.94129 4 6.70435 4 7.5V19.5C4 20.2957 4.31607 21.0587 4.87868 21.6213C5.44129 22.1839 6.20435 22.5 7 22.5H17C17.7957 22.5 18.5587 22.1839 19.1213 21.6213C19.6839 21.0587 20 20.2957 20 19.5V7.5C20 6.70435 19.6839 5.94129 19.1213 5.37868C18.5587 4.81607 17.7956 4.5 17 4.5H15.8284C15.6807 4.0821 15.4407 3.69808 15.1213 3.37868C14.5587 2.81607 13.7956 2.5 13 2.5H11ZM10.2929 4.79289C10.4804 4.60536 10.7348 4.5 11 4.5H13C13.2652 4.5 13.5196 4.60536 13.7071 4.79289C13.8946 4.98043 14 5.23478 14 5.5C14 5.76522 13.8946 6.01957 13.7071 6.20711C13.5196 6.39464 13.2652 6.5 13 6.5H11C10.7348 6.5 10.4804 6.39464 10.2929 6.20711C10.1054 6.01957 10 5.76522 10 5.5C10 5.23478 10.1054 4.98043 10.2929 4.79289ZM7 6.5H8.17157C8.31933 6.9179 8.55928 7.30192 8.87868 7.62132C9.44129 8.18393 10.2044 8.5 11 8.5H13C13.7956 8.5 14.5587 8.18393 15.1213 7.62132C15.4407 7.30192 15.6807 6.9179 15.8284 6.5H17C17.2652 6.5 17.5196 6.60536 17.7071 6.79289C17.8946 6.98043 18 7.23478 18 7.5V19.5C18 19.7652 17.8946 20.0196 17.7071 20.2071C17.5196 20.3946 17.2652 20.5 17 20.5H7C6.73478 20.5 6.48043 20.3946 6.29289 20.2071C6.10536 20.0196 6 19.7652 6 19.5V7.5C6 7.23478 6.10536 6.98043 6.29289 6.79289C6.48043 6.60536 6.73478 6.5 7 6.5Z"
                  fill="#CBD5E1"
                />
              </svg>
              <span onClick={() => handleCategoryClick("취업 고민")} className={selectedCategory === "취업 고민" ? "active" : ""}>
                취업 고민
              </span>
            </div>
            <div className="ccategoryimg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.3362 2.55826C13.7343 2.70035 14 3.07738 14 3.50005V9.50005H20C20.3864 9.50005 20.7382 9.72265 20.9037 10.0718C21.0691 10.421 21.0186 10.8342 20.774 11.1333L11.774 22.1333C11.5063 22.4604 11.0619 22.5839 10.6638 22.4418C10.2658 22.2998 10 21.9227 10 21.5001V15.5001H4.00001C3.61362 15.5001 3.2618 15.2775 3.09634 14.9283C2.93088 14.5791 2.98138 14.1659 3.22605 13.8668L12.2261 2.86682C12.4937 2.53969 12.9381 2.41616 13.3362 2.55826ZM6.11025 13.5001H11C11.5523 13.5001 12 13.9478 12 14.5001V18.6986L17.8898 11.5001H13C12.4477 11.5001 12 11.0523 12 10.5001V6.30146L6.11025 13.5001Z"
                  fill="#CBD5E1"
                />
              </svg>
              <span onClick={() => handleCategoryClick("기타")} className={selectedCategory === "기타" ? "active" : ""}>
                기타
              </span>
            </div>
          </div>
        </div>
      </div>

      {postModalOpen && <PostModal onPostSubmit={handlePostSubmit} onCancel={togglePostModal} />}
    </div>
  );
}

export default Card;
