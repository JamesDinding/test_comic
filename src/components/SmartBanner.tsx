import { FunctionalComponent, h } from 'preact';
import Logo from "./../resources/img/logo-text.svg";
import IconClose from "./../resources/img/icon-close.svg";
import IconDownload from "./../resources/img/smartbanner-download.svg";
import { StateUpdater } from 'preact/hooks';

interface SmartBannerProps {
    SetSmartBannerVisiblity: StateUpdater<boolean>
}

const SmartBanner: FunctionalComponent<SmartBannerProps> = ({ SetSmartBannerVisiblity }) => {
    return (
        <div class="flex pt-2 pb-3 items-center gap-1.5 border-b border-gray-100 shadow-sm shrink-0" id="smartbanner">
            <a href="#" onClick={e => {
                e.preventDefault()
                SetSmartBannerVisiblity(false)
            }} id="close-smartbanner-btn"><IconClose class="text-gray-500 m-2 ml-3 h-4" /></a>

            <a href="/home?tc={{ channelId }}"><img src="/assets/img/logo.png" class="rounded-lg shadow-md h-12" alt="女神漫画" /></a>

            <div class="flex flex-col justify-start items-start mt-1 ml-1 grow">
                <a href="/home?tc={{ channelId }}"><Logo class="h-5 mt-1" alt="女神漫画" /></a>
                <span class="text-[11px] text-[#f98d83] py-1 font-medium tracking-widest whitespace-nowrap">最懂您需求的漫画网站</span>
            </div>

            <a href="/home?tc={{ channelId }}" class="rounded-full border-2 border-[#f98d83] text-[#ff978d] p-2 text-xs font-bold mr-2 hover:bg-[#ffe2e0] hover:text-[#e66a5f] whitespace-nowrap">安裝 APP<IconDownload class="inline mx-1 h-4" alt="安装" /></a>
        </div>
    );
};

export default SmartBanner;
