"""add review association table

Revision ID: 4896369b2c6a
Revises: 161218bc8ca3
Create Date: 2023-11-28 17:11:00.165871

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4896369b2c6a'
down_revision = '161218bc8ca3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint('fk_reviews_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_reviews_product_id_products', type_='foreignkey')
        batch_op.drop_column('product_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('product_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_reviews_product_id_products', 'products', ['product_id'], ['id'])
        batch_op.create_foreign_key('fk_reviews_user_id_users', 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###
