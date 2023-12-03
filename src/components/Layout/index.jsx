import { SignInFooter } from "../SignInFooter";
import { SignInHeader } from "../SignInHeader";
import styles from './index.module.css'

export function Layout({children}) {
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <SignInHeader />
                <main>
                    {children}
                </main>
                <SignInFooter />
            </div>
        </div>
    )
}