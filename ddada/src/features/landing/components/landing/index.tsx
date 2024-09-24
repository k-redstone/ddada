import Image from 'next/image'
import Link from 'next/link'

import Computer from '@/static/imgs/landing/landing-page-computres.png'
import IntroductionMessage from '@/static/imgs/landing/landing-page-information_message.png'
import ManagerImage from '@/static/imgs/landing/landing-page-manager.png'
import BadmintonRacket from '@/static/imgs/landing/landing-page_badminton_raket.svg'
import EasyCount from '@/static/imgs/landing/landing-page_easy_count.png'
import RealTimeRegister from '@/static/imgs/landing/landing-page_free_register.png'
import LandingPageMainLogo from '@/static/imgs/landing/landing-page_JOIN.png'
import ManagerIcon from '@/static/imgs/landing/landing-page_manager_icon.svg'
import Rank from '@/static/imgs/landing/landing-page_rank_cut.png'
import FreeRegister from '@/static/imgs/landing/landing-page_real_time_reservation.png'

export default function Landing() {
  return (
    <div className="w-full">
      <div className="w-full h-[500px] relative flex justify-center items-center">
        <Image
          src={LandingPageMainLogo}
          alt="landing page main logo"
          className="absolute z-10 w-full"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="z-40 flex flex-col gap-6">
          <div className="text-white flex flex-col justify-center items-center gap-[0.625rem]">
            <p className="text-5xl  font-bold">짜릿한 즐거움을 선사하는</p>
            <p className="text-3xl text-[#FCA211]">
              DDADA
              <span className="text-3xl text-white">
                와 함께 문화생활을 만들어요
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/login">
              <div className="text-[#FCA211] py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA] transition-colors duration-300 ease-in-out">
                지금 가입하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-[4.5rem] gap-[4.5rem] justify-center items-center">
        <div className="text-5xl font-bold flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center">
            <p>매치 신청부터 </p>
            <p>
              요약, 분석까지<span className="text-[#FCA211]">.</span>
            </p>
          </div>
          <div className="text-base font-normal flex flex-col justify-center items-center">
            <p>DDADA를 즐겨주시는 여러분의</p>
            <p>매치데이터를 기반으로 분석을 해드려요</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={Computer}
            alt="computers"
            width={800}
            height={352}
            priority
          />
        </div>
      </div>
      <div className="w-full">
        <Image
          src={IntroductionMessage}
          alt="introduction message"
          height={500}
          className="w-full"
          priority
        />
      </div>
      <div className="flex flex-col px-8 py-[4.5rem] gap-[4.5rem] justify-center items-center">
        <div className="text-5xl font-bold flex flex-col justify-center items-center">
          <p>체육관 예약관리의 </p>
          <p>가장 쉬운 방법,</p>
          <p>
            DDADA<span className="text-[#FCA211]">.</span>
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/login">
            <div className="text-[#FCA211] text-xl py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA] transition-colors duration-300 ease-in-out">
              체육관 제휴맺기
            </div>
          </Link>
        </div>
        <div>
          <div className="flex gap-[4.5rem]">
            <div className="h-[400px] w-[400px]">
              <Image src={FreeRegister} alt="free register" priority />
            </div>
            <div className="h-[400px] w-[400px]">
              <Image src={EasyCount} alt="easy count" priority />
            </div>
            <div className="h-[400px] w-[400px]">
              <Image src={RealTimeRegister} alt="real time register" priority />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden relative">
        <Image src={Rank} alt="rank" style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="h-[500px] w-full relative flex justify-left items-center px-[12.5rem] py-[4.5rem]">
        <Image
          src={ManagerImage}
          alt="manager"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <div className="z-40 flex flex-col gap-6">
          <div>
            <ManagerIcon />
          </div>
          <div className="text-white flex flex-col  gap-[0.625rem]">
            <p className="text-5xl  font-bold">공정한 심판,</p>
            <p className="text-5xl  font-bold">따다 매니저</p>
            <p className="text-base text-white">
              매니저는 경기 심판을 보고 과정을 기록해요
            </p>
          </div>
          <div className="flex justify-left">
            <Link href="/login">
              <div className="text-[#FCA211] py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA] transition-colors duration-300 ease-in-out">
                매니저 신청하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-[4.5rem] px-24 gap-[4.5rem] justify-center items-center">
        <BadmintonRacket />
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-5xl font-bold">
            취향에 맞는 라켓은 모두, DDADA
            <span
              className="
          text-[#FCA211]"
            >
              .
            </span>
          </p>
          <p>
            내 플레이 스타일은 어떤지, 딱 맞는 라켓을 찾고 계시다면 DDADA에서
            추천받아보세요
          </p>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex gap-[72px] justify-center">
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">무게</p>
                <p className="text-4xl text-[#6B6E78]">가벼움</p>
              </div>
            </div>
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">스타일</p>
                <p className="text-4xl text-[#6B6E78]">공격적</p>
              </div>
            </div>
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">재질</p>
                <p className="text-4xl text-[#6B6E78]">카본</p>
              </div>
            </div>
          </div>
          <div className="flex gap-[72px] justify-center">
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">가격</p>
                <p className="text-4xl text-[#6B6E78]">10만원대</p>
              </div>
            </div>
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">탄성</p>
                <p className="text-4xl text-[#6B6E78]">유연</p>
              </div>
            </div>
            <div className="flex-1 px-12 py-6 shadow-xl rounded-xl">
              <div className="flex flex-col gap-6 justify-center items-center">
                <p className="text-3xl font-bold">색감</p>
                <p className="text-4xl text-[#6B6E78]">유채색</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
