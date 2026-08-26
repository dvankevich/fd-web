import { useEffect, useState } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FieldLabel, FormError } from '@shared/ui';
import trashIcon from '../../../assets/trash.svg';
import { createRecipe, getIngredients, getAreas, getCategories } from '../../../services/recipes';

import type { Ingredient, Option, RecipeFormValues } from '../../../types/recipe';

import CustomSelect from './CustomSelect';
import ImageUploader from './ImageUploader';
import IngredientItem from './IngredientItem';

import css from './AddRecipeForm.module.css';

const initialValues: RecipeFormValues = {
  image: null,
  title: '',
  description: '',
  category: '',
  area: '',
  time: 1,
  ingredients: [],
  instructions: '',
};

const validationSchema = Yup.object({
  image: Yup.mixed<File>().required('Upload a photo'),

  title: Yup.string().trim().required('Enter recipe name').min(5, 'Minimin 10 characters'),

  description: Yup.string()
    .trim()
    .required('Enter description')
    .min(10, 'Minimin 10 characters')
    .max(200, 'Maximum 200 characters'),

  category: Yup.string().required('Select category'),

  area: Yup.string().required('Select area'),

  time: Yup.number().required('Enter cooking time').min(1, 'Minimum 1 minute'),

  ingredients: Yup.array()
    .min(1, 'Add at least one ingredient')
    .required('Add at least one ingredient'),

  instructions: Yup.string()
    .trim()
    .required('Enter recipe preparation')
    .min(10, 'Minimin 10 characters')
    .max(1000, 'Maximum 1000 characters'),
});

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientId, setIngredientId] = useState('');
  const [measure, setMeasure] = useState('');
  const [notification, setNotification] = useState('');
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);

  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [areaOptions, setAreaOptions] = useState<Option[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadIngredients = async () => {
      try {
        setIsLoadingIngredients(true);
        setIsLoadingOptions(true);

        const [ingredientsData, categoriesData, areasData] = await Promise.all([
          getIngredients(),
          getCategories(),
          getAreas(),
        ]);

        if (!isMounted) {
          return;
        }
        setIngredients(ingredientsData);
        setCategoryOptions(categoriesData);
        setAreaOptions(areasData);
      } catch {
        if (isMounted) {
          setIngredients([]);
          setNotification('Could not load ingredients.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingIngredients(false);
          setIsLoadingOptions(false);
        }
      }
    };

    loadIngredients();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (
    values: RecipeFormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<RecipeFormValues>,
  ) => {
    try {
      setNotification('');

      if (!values.ingredients.length) {
        setFieldTouched('ingredients', true);
        setNotification('Add at least one ingredient.');
        return;
      }

      const ingredientsPayload = values.ingredients.map((item) => ({
        id: String(item.id),
        measure: String(item.measure).trim(),
      }));

      const invalidIngredient = ingredientsPayload.some(
        (item) => !item.id || item.id === 'undefined' || item.id === 'null' || !item.measure,
      );

      if (invalidIngredient) {
        setNotification('One or more ingredients have an invalid ID.');
        return;
      }

      const formData = new FormData();

      if (values.image instanceof File) {
        formData.append('thumb', values.image);
      }

      formData.append('title', values.title.trim());

      formData.append('description', values.description.trim());

      formData.append('category', values.category);

      formData.append('area', values.area);

      formData.append('time', String(values.time));

      formData.append('instructions', values.instructions.trim());

      formData.append('ingredients', JSON.stringify(ingredientsPayload));

      const recipe = await createRecipe(formData);
      const recipeId = recipe?.id;

      if (!recipeId) {
        throw new Error('Recipe ID was not returned by API');
      }

      navigate(`/recipe/${recipeId}`);
    } catch (error: unknown) {
      const apiError = isAxiosError<{ error?: unknown }>(error)
        ? error.response?.data.error
        : undefined;

      if (typeof apiError === 'string') {
        setNotification(apiError);
      } else if (error instanceof Error) {
        setNotification(error.message);
      } else {
        setNotification('Could not publish recipe. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 
          NOTIFICATION
       */}

      {notification && (
        <div className={css.notification} role="alert">
          <span>{notification}</span>

          <button type="button" aria-label="Close notification" onClick={() => setNotification('')}>
            ×
          </button>
        </div>
      )}

      <Formik<RecipeFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          submitCount,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldValue,
          resetForm,
          isSubmitting,
        }) => {
          const hasError = (name: keyof RecipeFormValues) =>
            Boolean(errors[name] && (touched[name] || submitCount > 0));
          /* 
             ADD INGREDIENT
           */

          const addIngredient = () => {
            if (!ingredientId) {
              setNotification('Select an ingredient.');

              return;
            }

            if (!measure.trim()) {
              setNotification('Enter ingredient quantity.');

              return;
            }

            const ingredient = ingredients.find(
              (item) => String(item._id) === String(ingredientId),
            );

            if (!ingredient) {
              setNotification('Selected ingredient was not found.');

              return;
            }
            const ingredientDbId = String(ingredient._id);

            if (!ingredientDbId || ingredientDbId === 'undefined' || ingredientDbId === 'null') {
              setNotification('Selected ingredient has an invalid ID.');

              return;
            }

            const alreadyAdded = values.ingredients.some(
              (item) => String(item.id) === ingredientDbId,
            );

            if (alreadyAdded) {
              setNotification('This ingredient has already been added.');

              return;
            }

            const newIngredient = {
              id: ingredientDbId,
              name: ingredient.name,
              image: ingredient.img ?? '',
              measure: measure.trim(),
            };

            setFieldValue('ingredients', [...values.ingredients, newIngredient], true);

            setIngredientId('');
            setMeasure('');
            setNotification('');

            setFieldTouched('ingredients', true, false);
          };

          /* 
             DELETE INGREDIENT
           */

          const deleteIngredient = (id: string) => {
            setFieldValue(
              'ingredients',
              values.ingredients.filter((ingredient) => String(ingredient.id) !== String(id)),
            );
          };

          /* 
             RESET
        */

          const reset = () => {
            resetForm();

            setIngredientId('');
            setMeasure('');
            setNotification('');
          };

          /*
             RETURN
          */

          return (
            <Form className={css.form} noValidate>
              <div className={css.grid}>
                {/* 
                    IMAGE
                */}

                <ImageUploader
                  file={values.image}
                  onChange={(file) => {
                    setFieldValue('image', file);

                    setFieldTouched('image', true);
                  }}
                  error={touched.image ? errors.image : undefined}
                />

                <div className={css.fields}>
                  {/* 
                      TITLE
                   */}

                  <label className={css.textField}>
                    <span className={css.nameLabel}>THE NAME OF THE RECIPE</span>

                    <input
                      name="title"
                      value={values.title}
                      placeholder="Enter recipe name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={hasError('title')}
                      aria-describedby="title-error"
                      className={hasError('title') ? css.invalidLine : ''}
                    />

                    <FormError id="title-error" as="span" variant="compact">
                      {hasError('title') ? errors.title : undefined}
                    </FormError>
                  </label>

                  {/* 
                      DESCRIPTION
                   */}

                  <label className={css.textField}>
                    <span
                      className={`${css.inputLine} ${
                        hasError('description') ? css.invalidLine : ''
                      }`}
                    >
                      <input
                        name="description"
                        value={values.description}
                        maxLength={200}
                        placeholder="Enter a description of the dish"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={hasError('description')}
                        aria-describedby="description-error"
                      />

                      <em>{values.description.length}/200</em>
                    </span>

                    <FormError id="description-error" as="span" variant="compact">
                      {hasError('description') ? errors.description : undefined}
                    </FormError>
                  </label>

                  {/* 
                      CATEGORY + TIME
                   */}

                  <div className={css.categoryRow}>
                    <CustomSelect
                      label="CATEGORY"
                      value={values.category}
                      options={categoryOptions}
                      placeholder={isLoadingOptions ? 'Loading categories...' : 'Select a category'}
                      onChange={(id) => {
                        const selected = categoryOptions.find((item) => item._id === id);

                        setFieldValue('category', selected?.name ?? '');
                        setFieldTouched('category', true, false);
                      }}
                      error={touched.category ? errors.category : undefined}
                    />

                    <div>
                      <FieldLabel>COOKING TIME</FieldLabel>

                      <div className={css.time}>
                        <button
                          type="button"
                          onClick={() => setFieldValue('time', Math.max(1, values.time - 1))}
                        >
                          −
                        </button>

                        <span>{values.time} min</span>

                        <button
                          type="button"
                          onClick={() => setFieldValue('time', values.time + 5)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 
                      AREA
                   */}

                  <CustomSelect
                    label="AREA"
                    value={values.area}
                    options={areaOptions}
                    placeholder={isLoadingOptions ? 'Loading areas...' : 'Select an area'}
                    onChange={(id) => {
                      const selected = areaOptions.find((item) => item._id === id);

                      setFieldValue('area', selected?.name ?? '');
                      setFieldTouched('area', true, false);
                    }}
                    error={touched.area ? errors.area : undefined}
                  />

                  {/* 
                      INGREDIENTS
                   */}

                  <section className={css.ingredients}>
                    <h2>INGREDIENTS</h2>

                    <div className={css.ingredientControls}>
                      <CustomSelect
                        value={ingredientId}
                        options={ingredients}
                        placeholder={
                          isLoadingIngredients ? 'Loading ingredients...' : 'Add the ingredient'
                        }
                        onChange={setIngredientId}
                      />

                      <input
                        value={measure}
                        placeholder="Enter quantity"
                        onChange={(event) => setMeasure(event.target.value)}
                      />
                    </div>

                    <button
                      className={css.addButton}
                      type="button"
                      onClick={addIngredient}
                      disabled={isLoadingIngredients || !ingredientId || !measure.trim()}
                    >
                      ADD INGREDIENT <span>＋</span>
                    </button>

                    <FormError variant="compact">
                      {touched.ingredients && typeof errors.ingredients === 'string'
                        ? errors.ingredients
                        : undefined}
                    </FormError>

                    <ul className={css.ingredientList}>
                      {values.ingredients.map((item) => (
                        <IngredientItem key={item.id} item={item} onDelete={deleteIngredient} />
                      ))}
                    </ul>
                  </section>

                  {/* 
                      INSTRUCTIONS
                   */}

                  <label className={css.textField}>
                    <FieldLabel as="span">RECIPE PREPARATION</FieldLabel>

                    <span
                      className={`${css.inputLine} ${
                        hasError('instructions') ? css.invalidLine : ''
                      }`}
                    >
                      <textarea
                        name="instructions"
                        value={values.instructions}
                        maxLength={1000}
                        placeholder="Enter recipe"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={hasError('instructions')}
                        aria-describedby="instructions-error"
                      />

                      <em>{values.instructions.length}/1000</em>
                    </span>

                    <FormError id="instructions-error" as="span" variant="compact">
                      {hasError('instructions') ? errors.instructions : undefined}
                    </FormError>
                  </label>

                  {/* 
                      ACTIONS
                   */}

                  <div className={css.actions}>
                    <button
                      type="button"
                      className={css.resetButton}
                      aria-label="Reset form"
                      onClick={reset}
                    >
                      <img className={css.resetIcon} src={trashIcon} alt="" />
                    </button>

                    <button
                      type="submit"
                      className={css.publishButton}
                      disabled={isSubmitting || isLoadingIngredients}
                    >
                      {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
