import React, { useState} from 'react';
import styles from'./IntroGoals.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
type ITerms = {
    termsAndConditions: boolean;
};

const IntroGoals = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ITerms>({
        mode: 'onSubmit',
        shouldFocusError: true,
        shouldUnregister: false,
      });
      const onSubmit = async () => {
            navigate('/add-goals');
        };
    return (
        <Layout defaultHeader={true} hamburger={true}>
            <div className={styles["IntroGoals"]}>
                <h2 className={styles["Title"]}>
                    Introducing health goals
                </h2>
                <p className={styles["Description"]}>
                    Explanation of health goal
                </p>
                <img src={`${process.env.PUBLIC_URL}/assets/images/background.png`} className={styles["Image"]} alt="Image" />
                <Button
                    className="Pref-btn btn"
                    loading={isLoading}
                    onClick={handleSubmit(onSubmit)}
                >
                    Next
                </Button>
            </div>
        </Layout>
    )

}
export default IntroGoals