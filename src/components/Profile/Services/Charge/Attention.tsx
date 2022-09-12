import { h, FunctionalComponent, Fragment } from "preact";

const att = [
  "充值前，请先完善会员资料，以免因退出账号而无法找回余额，损失由用户自行承担。",
  "如果无法付款，请退出后重新操作，或切换其他支付线路。",
  "若充值未到账，请联系客服，由专人为您解决。",
  "本站採用 SSL安全交易驗證，且帳單不會顯示任何成人訊息，請安心使用。",
];

const Attention: FunctionalComponent = () => {
  return (
    <div className="text-[#9e7654]">
      <div className="charge-attention-title">注意事项</div>
      <ul className="py-2.5">
        {att.map((a, i, arr) => {
          return (
            <li className="flex text-xs leading-relaxed">
              <span>{i + 1}.&nbsp;</span>
              <span>{a}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Attention;
