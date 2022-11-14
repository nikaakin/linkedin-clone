import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

class PostModal extends React.PureComponent {
  state = { editorText: "", shareImage: "", videoLink: "", assetArea: "" };

  handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }

    this.setState({ shareImage: image });
  };

  postArticle = (e) => {
    e.preventDefault();
    this.props.onCloseModal(e);
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: this.state.shareImage,
      video: this.state.videoLink,
      user: this.props.user,
      description: this.state.editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    this.props.postArticle(payload);
    this.setState({
      shareImage: "",
      videoLink: "",
      assetArea: "",
      editorText: "",
    });
  };

  switchAssetArea = (area) => {
    this.setState({ assetArea: area, shareImage: "", videoLink: "" });
  };

  render() {
    return (
      <Container>
        <Content>
          <Header>
            <h2>Create a post</h2>
            <button onClick={this.props.onCloseModal}>
              <img src="/images/close-icon.svg" alt="" />
            </button>
          </Header>
          <SharedContent>
            <UserInfo>
              {this.props.user.photoURL ? (
                <img src={this.props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <span>{this.props.user.displayName}</span>
            </UserInfo>
            <Editor>
              <textarea
                placeholder="What do you want to talk about?"
                value={this.state.editorText}
                onChange={(e) => this.setState({ editorText: e.target.value })}
                autoFocus={true}
              />
              {/* //!! (FILE INPUT is NOT DISPLAYED, IT IS ACCESSED FROM LABEL) */}
              <UploadImage>
                {this.state.assetArea === "image" ? (
                  <>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      value=""
                      style={{ display: "none" }}
                      onChange={this.handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {/* //!! display image  */}
                    {this.state.shareImage && (
                      <img
                        src={URL.createObjectURL(this.state.shareImage)}
                        alt=""
                      />
                    )}
                  </>
                ) : (
                  this.state.assetArea === "video" && (
                    <>
                      {/* VIDEO */}
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={this.state.videoLink}
                        onChange={(e) =>
                          this.setState({ videoLink: e.target.value })
                        }
                      />
                      {this.state.videoLink && (
                        <ReactPlayer
                          width={"100%"}
                          url={this.state.videoLink}
                        />
                      )}
                    </>
                  )
                )}
              </UploadImage>
            </Editor>
          </SharedContent>
          <ShareCreation>
            <AttachAssets>
              <AssetButton onClick={() => this.switchAssetArea("image")}>
                <img src="/images/image-icon.svg" alt="" />
              </AssetButton>
              <AssetButton onClick={() => this.switchAssetArea("video")}>
                <img src="/images/video-icon.svg" alt="" />
              </AssetButton>
            </AttachAssets>
            <ShareComment>
              <AssetButton>
                <img src="/images/comment-icon.svg" alt="" />
                Anyone
              </AssetButton>
            </ShareComment>
            <PostButton
              disabled={!this.state.editorText ? true : false}
              onClick={this.postArticle}
            >
              Post
            </PostButton>
          </ShareCreation>
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  /* everything 0 means take whole screen */
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.5s;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  max-width: 550px;
  max-height: 90%;
  top: 32px;
  margin: 0 auto;
  overflow: initial;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  align-items: center;
  button {
    height: 35px;
    width: 35px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background-color: transparent;
    position: relative;
    padding: 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-size: 16px;
    font-weight: 600;
    margin: 5px;
    line-height: 1.5;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-inline: 16px;
  /* props is a state of Postbutton I GUESSSS !!!??? */
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,.2)" : "white")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.08)" : "#004182"};
  }
  /* traditionally but styled components allow you to use props in here */
  /* &:disabled {
    cursor: not-allowed;
    background-color: rgba(0, 0, 0, 0.8);
  } */
`;

const Editor = styled.div`
  padding: 12px 24px;
  & > textarea {
    width: 100%;
    min-height: 100px;
    overflow-y: auto;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
