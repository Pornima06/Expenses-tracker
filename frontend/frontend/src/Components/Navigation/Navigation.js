import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Navigation({ active, setActive }) {
  const { user, isSignedIn } = useUser();

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>Budget Buddy</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        {isSignedIn ? (
          <UserBtn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    height: "40px",
                    width: "40px",
                  },
                },
              }}
            />

            <UserInfo>
              <p>{user.fullName || user.username}</p>
              {user?.emailAddresses[0].emailAddress || user.emailAddresses[0]}
            </UserInfo>
          </UserBtn>
        ) : (
          <SignInButton>
            <LoginBtn>Sign in with Clerk</LoginBtn>
          </SignInButton>
        )}
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

const UserBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    color: rgba(34, 34, 96, 1);
  }
`;
const LoginBtn = styled.button`
  outline: none;
  border: none;
  background: #222260;
  color: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Navigation;
