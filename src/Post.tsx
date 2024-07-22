import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
}

export const Post: React.FC<Props> = ({ className }) => {
    return (
        <section className={twMerge(``,
            className
        )}>
            <div className={`mt-8 grid [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] gap-6
                *:rounded-xl
                *:transition
                *:durartion-300
                *:bg-white/10
                *:cursor-pointer
                hover:*:bg-white/20
                hover:*:shadow-xl
                [&_.capture]:rounded-xl
                [&_.capture]:object-cover
                [&_.capture]:h-60

                [&_.avatar]:size-8
                [&_.avatar]:rounded-full
                [&_.avatar]:object-cover
                
                [&>article>div]:p-4
                [&>article_div]:flex
                [&>article_div]:items-center
                [&>article_div]:justify-between
                [&>article_div]:gap-3

                [&_.user]:flex
                [&_.user]:gap-2
                [&_.user]:items-center
                [&_.user_span]:font-semibold

                [&_.stats>p]:flex 
                [&_.stats>p]:items-center
                [&_.stats>p]:gap-2
                [&_.stats>p]:flex
            `}>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>
                <article>
                    <img src="https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/previews/4153d7bf-5de3-4149-9e51-201133210072.png" alt="Likes Dislikes Stats" className="capture" />
                    <div>
                        <div className="user">
                            <img src="https://avatars.githubusercontent.com/u/131040868?v=4" alt="Blackwolf" className="avatar" />
                            <p>by <span>Blackwolf</span></p>
                        </div>
                        <div className="stats">
                            <p>
                                <span className="material-symbols-outlined">chat</span>
                                3
                            </p>
                            <p>
                                <span className="material-symbols-outlined">favorite</span>
                                4
                            </p>
                        </div>
                    </div>
                </article>

            </div>
        </section>
    )
}