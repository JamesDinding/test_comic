import { FunctionalComponent, h } from "preact";

const Customer = () => {
  return (
    <div className="p-4 text-[#212121]">
      <p className="text-[.9rem] leading-[1.6rem]">
        若您的账户、金币或 VIP服务异常或其他使用上遇到问题，
        <br />
        您可透过以下方式连系我们 :-)
      </p>
      <h2 className="customer-section-title">在线即时客服</h2>
      <a
        href="https://direct.lc.chat/14046954/?paymode=1"
        className="customer-button bg-[#e9f4ff] border-[1px] border-solid border-[#369] text-[#369] hover:bg-white flex items-center"
      >
        <div className="align-middle">img</div>
        <span className="ml-10">在线客服</span>
      </a>
      <a
        href="https://t.me/mhmh_fun?paymode=1"
        className="customer-button bg-[#fafafa] border-[1px] border-solid border-[#999] text-[#666] hover:bg-white flex items-center"
      >
        <div className="align-middle">img</div>
        <span className="ml-10">@mhmh_fun</span>
      </a>
      <h2 className="customer-section-title">
        Email
        <br />
        <small className="tracking-[0px]">
          （时效较慢，但若其他方式无法使用，可利用本方式）
        </small>
      </h2>
      <a
        href="mailto:cs@mhmh.fun?subject=【女神漫画】客服询问"
        className="customer-button bg-[#fff4f4] border-[1px] border-solid border-[#d34242] text-[#900] hover:bg-white flex items-center justify-center"
      >
        <div className="align-middle">img</div>
        <span className="ml-10 text-[1.2rem]">cs@mhmh.fun</span>
      </a>
      <p className="text-[.8rem] text-[#ff0000] m-8 leading-[1.6rem]">
        若您有意开展商业合作，请优先使用飞机号或 Email
      </p>
    </div>
  );
};

export default Customer;
