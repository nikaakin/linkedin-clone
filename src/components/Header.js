import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";

class Header extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Logo>
            <a href="/home">
              <img src="images/home-logo.svg" alt="home logo" />
            </a>
          </Logo>
          <Search>
            <div>
              <input type="text" placeholder="Search" />
              <SearchIcon>
                <img src="/images/search-icon.svg" alt="search icon" />
              </SearchIcon>
            </div>
          </Search>
          <Nav>
            <NavListWrapper>
              <NavList className="active">
                <a>
                  <img src="/images/nav-home.svg" alt="nav home svg" />
                  <span>Home</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src="/images/nav-network.svg" alt="nav home svg" />
                  <span>My Network</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src="/images/nav-jobs.svg" alt="nav home svg" />
                  <span>Jobs</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src="/images/nav-messaging.svg" alt="nav home svg" />
                  <span>Messaging</span>
                </a>
              </NavList>
              <NavList>
                <a>
                  <img src="/images/nav-notifications.svg" alt="nav home svg" />
                  <span>Notifications</span>
                </a>
              </NavList>
              <User>
                <a>
                  {this.props.user && this.props.user.photoURL ? (
                    <img src={this.props.user.photoURL} alt="" />
                  ) : (
                    <img src="/images/user.svg" alt="" />
                  )}
                  <span>
                    Me
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
                <SignOut onClick={() => this.props.signOut()}>
                  <a>Sign out</a>
                </SignOut>
              </User>
              <Work>
                <a>
                  <img src="/images/nav-work.svg" alt="" />
                  <span>
                    Work
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
              </Work>
            </NavListWrapper>
          </Nav>
        </Content>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: white;
  border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0;
`;

const Search = styled.div`
  position: relative;
  opacity: 1;
  flex-grow: 1;
  & > div {
    max-width: 280px;
    & > input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      color: rgba(0, 0, 0, 0.9);
      border-radius: 2px;
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 2px;
  width: 40px;
  z-index: 1;
  border-radius: 0 2px 2px 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`;

const NavListWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
    &:hover,
    &:active {
      a {
        span {
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`;
const SignOut = styled.div`
  position: absolute;
  top: 43px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 170ms;
  text-align: centre;
  display: none;
  @media (max-width: 768px) {
    top: -30px;
  }
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 00, 0.08);
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const dispatchStateToAction = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, dispatchStateToAction)(Header);
