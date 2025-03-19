export const dynamic = "force-static";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-3 text-center py-36 md:px-0">
      <span className="text-xl font-bold text-Placeholder">
        페이지를 찾을 수 없습니다.
      </span>
      <span className="font-bold text-[100px] text-Language">404 Error</span>
      <span className="text-Placeholder">
        페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </span>
    </div>
  );
};

export default NotFoundPage;
