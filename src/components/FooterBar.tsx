import { FunctionalComponent, h } from 'preact';
import IconHome from "./../resources/img/footer-home.svg";
import IconVideo from "./../resources/img/footer-video.svg";
import IconBookmark from "./../resources/img/footer-bookmark.svg";
import IconProfile from "./../resources/img/footer-profile.svg";
import { Link } from 'preact-router/match';

const FooterBar: FunctionalComponent = () => {
    return (
        <footer class="border-t border-gray-100 shrink-0 shadow grid grid-cols-4 text-center py-2 select-none">
            <Link activeClassName="active" href="/home" class="group">
                <IconHome alt="首页" />
                <span>首页</span>
            </Link>
            <Link activeClassName="active" href="/video-home" class="group">
                <IconVideo alt="动漫" />
                <span>动漫</span>
            </Link>
            <Link activeClassName="active" href="/bookmark" class="group">
                <IconBookmark alt="收藏" />
                <span>收藏</span>
            </Link>
            <Link activeClassName="active" href="/profile" class="group">
                <IconProfile alt="我的" />
                <span>我的</span>
            </Link>
        </footer>);
}

export default FooterBar;
