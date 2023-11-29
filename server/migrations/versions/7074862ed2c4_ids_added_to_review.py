"""ids added to Review

Revision ID: 7074862ed2c4
Revises: 5573d1a89fbd
Create Date: 2023-11-28 17:24:01.704590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7074862ed2c4'
down_revision = '5573d1a89fbd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('product_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_reviews_product_id_products'), 'products', ['product_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_reviews_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_reviews_product_id_products'), type_='foreignkey')
        batch_op.drop_column('product_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
