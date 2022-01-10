import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth0 } from '../../auth0';

import SignupDefaultImg from '../../assets/img/signupImg.png';
import { REGISTER_USER } from '../../graphQL/mutations';
import { Select } from '../molecules';
import { VERIFY_USER } from '../../graphQL/queries';
import { LoadingTemplate } from '.';

const StyledSignupTemplate = styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledSignupWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  margin-left: 250px;
  margin-right: 150px;
  flex-direction: column;
`;

const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledProfileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
`;

export enum StartOfWeek {
  MONDAY = 'MONDAY',
  SUNDAY = 'SUNDAY',
}

interface PropTypes {
  nickname: string;
  motto: string;
  isMonday: boolean;
  setNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setMotto: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsMonday: React.Dispatch<React.SetStateAction<boolean>>;
  onSignUp: () => void;
}

export const SignupTemplate = ({
  nickname = '',
  motto = '',
  isMonday = false,
  setNickname = () => {},
  setMotto = () => {},
  setIsMonday = () => {},
  onSignUp = () => {},
}: PropTypes): JSX.Element => {
  return (
    <StyledSignupTemplate>
      <StyledSignupWrapper>
        <StyledProfileWrapper>
          <StyledProfileImageWrapper>
            <p
              style={{
                fontWeight: 500,
                fontSize: 30,
                letterSpacing: -0.5,
              }}
            >
              프로필 설정하기
            </p>
            <div
              style={{
                backgroundColor: '#F7F5FF',
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
            >
              <img src={SignupDefaultImg} alt="기본이미지" />
            </div>
            <button
              style={{
                width: 200,
                height: 50,
                marginTop: 15,
                cursor: 'pointer',
                backgroundColor: '#F7F5FF',
                borderRadius: 100,
                fontWeight: 400,
                fontSize: 18,
                color: '#AB88F4',
                border: 0,
              }}
              type="button"
              onClick={(e) => {
                window.alert('개발중인 기능입니다.');
              }}
            >
              프로필 사진 변경하기
            </button>
          </StyledProfileImageWrapper>
          <StyledProfileInputWrapper>
            <div
              style={{
                width: '100%',
                height: 70,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  이름
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontWeight: 300,
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  한글 / 영어 / 숫자 / 이모티콘의 조합으로 만들어주세요 (최대
                  10자)
                </p>
              </div>
              <input
                style={{
                  width: 190,
                  border: 0,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: -0.5,
                  outline: 'none',
                  textDecorationLine:
                    nickname.length > 0 ? undefined : 'underline',
                  color: nickname.length > 0 ? '#000000' : '#C5C5C5',
                }}
                type="text"
                placeholder="티리 Tiry"
                value={nickname}
                onChange={setNickname}
                maxLength={10}
              />
            </div>
            <div
              style={{
                width: '100%',
                height: 70,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                marginTop: 40,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  나의 다짐
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontWeight: 300,
                    fontSize: 16,
                    color: '#000000',
                  }}
                >
                  나의 다짐 한마디를 작성해주세요 (최대 20자)
                </p>
              </div>
              <input
                style={{
                  width: 346,
                  border: 0,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: -0.5,
                  outline: 'none',
                  textDecorationLine:
                    motto.length > 0 ? undefined : 'underline',
                  color: motto.length > 0 ? '#000000' : '#C5C5C5',
                }}
                type="text"
                placeholder="나의 다이어리를 할 일로 가득 채워보자!"
                value={motto}
                onChange={setMotto}
                maxLength={20}
              />
            </div>
          </StyledProfileInputWrapper>
        </StyledProfileWrapper>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            marginTop: 46,
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: 30,
            }}
          >
            시간 설정하기
          </p>
          <div>
            <p
              style={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              한주의 시작
            </p>
            <Select
              isLeft={isMonday}
              leftWord="월요일"
              rightWord="일요일"
              onLeftClick={() => {
                setIsMonday(true);
              }}
              onRightClick={() => {
                setIsMonday(false);
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              alignItems: 'center',
              marginTop: 40,
            }}
          >
            <button
              style={{
                width: 256,
                height: 70,
                border: 0,
                cursor: 'pointer',
                backgroundColor: '#F7F5FF',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 25,
                fontWeight: 500,
                color: '#D6C2FF',
              }}
              type="button"
              onClick={onSignUp}
            >
              Tiry 시작하기 →
            </button>
          </div>
        </div>
      </StyledSignupWrapper>
    </StyledSignupTemplate>
  );
};