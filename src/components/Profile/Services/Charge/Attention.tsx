import { h, FunctionalComponent, Fragment } from "preact";

const att = [
  "充值前，请先完善会员资料，以免因退出账号而无法找回余额，损失由用户自行承担。",
  "如果无法付款，请退出后重新操作，或切换其他支付线路。",
  "若充值未到账，请联系客服，由专人为您解决。",
  "本站采用 SSL安全交易验证，且帐单不会显示任何成人讯息，请安心使用。",
];

const Attention: FunctionalComponent = () => {
  return (
    <div className="text-[#6d5694]">
      <div className="charge-attention-title">注意事项</div>
      <ul className="py-2.5">
        {att.map((a, i, arr) => {
          return (
            <li className="flex text-xs font-light leading-relaxed tracing-wider">
              <span className="w-[.8rem] shrink-0">{i + 1}.&nbsp;</span>
              <span>{a}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Attention;
