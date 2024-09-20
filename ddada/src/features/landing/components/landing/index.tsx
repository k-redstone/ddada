import Image from 'next/image'

import Computers from '@/static/imgs/landing/landing-page-computers.png'
import IntroductionMessage from '@/static/imgs/landing/landing-page-information_message.png'
import ManagerImage from '@/static/imgs/landing/landing-page-manager.png'
import LandingPageMainLogo from '@/static/imgs/landing/landing-page_JOIN.png'
import Rank from '@/static/imgs/landing/landing-page_rank.png'
import Link from 'next/link'
import FreeRegister from '@/static/imgs/landing/landing-page_real_time_reservation.png'
import EasyCount from '@/static/imgs/landing/landing-page_easy_count.png'
import RealTimeRegister from '@/static/imgs/landing/landing-page_free_register.png'
import ManagerIcon from '@/static/imgs/landing/landing-page_manager_icon.svg'

export default function Landing() {
  return (
    <div className="w-full">
      <div className="w-full h-[500px] relative flex justify-center items-center">
        <Image
          src={LandingPageMainLogo}
          alt="landing page main logo"
          className="absolute z-10 w-full"
          fill
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
            <Link href={'/login'}>
              <div className="text-[#FCA211] py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA]">
                지금 가입하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Image
          src={Computers}
          alt="computers"
          height={500}
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Image
          src={IntroductionMessage}
          alt="introduction message"
          height={500}
          className="w-full"
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
          <Link href={'/login'}>
            <div className="text-[#FCA211] text-xl py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA]">
              체육관 제휴맺기
            </div>
          </Link>
        </div>
        <div>
          <div className="flex gap-[4.5rem]">
            <div className="h-[400px] w-[400px]">
              <Image src={FreeRegister} alt="free register" />
            </div>
            <div className="h-[400px] w-[400px]">
              <Image src={EasyCount} alt="easy count" />
            </div>
            <div className="h-[400px] w-[400px]">
              <Image src={RealTimeRegister} alt="real time register" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[750px] w-full overflow-hidden relative">
        <Image src={Rank} alt="rank" className="object-contain" />
      </div>
      <div className="object-cover h-[500px] w-full relative flex justify-left items-center px-[12.5rem] py-[4.5rem]">
        <Image
          src={ManagerImage}
          alt="manager"
          layout="fill"
          objectFit="cover"
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
            <Link href={'/login'}>
              <div className="text-[#FCA211] py-4 px-12 border border-[#FCA211] hover:bg-[#FCA211] hover:text-[#FFFBEA]">
                매니저 신청하기
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-[4.5rem] px-8 gap-[4.5rem] justify-center items-center">
        <div>배드민턴채 </div>
        <div>
          <p className="text-5xl font-bold">
            취향에 맞는 라켓은 모두, DDADA{' '}
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
        <div>무게</div>
      </div>
    </div>
  )
}
