import { useEffect } from 'react'

interface ObserverProps {
  target: React.RefObject<HTMLElement>
  root?: Element | null
  rootMargin?: string
  threshold?: number
  onIntersect: IntersectionObserverCallback
}

export const useObserver = ({
  target, // 감지할 대상(여기서는 ref를 전달했다.)
  root = null, // 교차할 부모 요소(default : document)
  rootMargin = '0px', // root와 target이 감지하는 여백의 거리
  threshold = 1.0, // 임계점으로, 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
  onIntersect, // target 감지 시 실행할 callback 함수
}: ObserverProps) => {
  useEffect(() => {
    let observer: IntersectionObserver

    // 넘어오는 element가 있어야 observer를 생성
    if (target && target.current) {
      // callback의 인자로 들어오는 entry는 기본적으로 순환자이기 때문에
      // 복잡한 로직을 필요로 할때가 많다.
      // callback을 선언하는 곳에서 로직을 짜서 통째로 넘기도록 하겠다.
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      })
      // 실제 Element가 들어있는 current 관측 시작
      observer.observe(target.current)
    }
    // observer를 사용하는 컴포넌트가 해제되면 observer도 끈다
    return () => observer && observer.disconnect()
  }, [target, root, rootMargin, threshold, onIntersect])
}
