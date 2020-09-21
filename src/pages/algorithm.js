import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MdClose, MdReplay } from 'react-icons/md';

import Layout from '../layouts/index';
import Top from '../components/PageTop';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Search from '../components/Search';
import ProblemList from '../components/HideList';
import pageText from '../../contents/data/pageText';

const AlgorithmPage = (props) => {
  const { posts, froms, levels } = props.data;
  const [show, setShow] = useState(false);
  const [up, setUp] = useState(false);
  const [filtered, setFiltered] = useState(posts.edges);
  const [filterWords, setFilterWords] = useState({
    from: [],
    level: [],
    keyword: [],
  });
  const countTotal = posts.edges.length;
  const countPosts = filtered.length;

  useEffect(() => {
    const filteredKeyword = filterPost('key', filterWords.keyword, posts.edges);
    const filteredFrom = filterPost('from', filterWords.from, filteredKeyword);
    const filteredLevel = filterPost('level', filterWords.level, filteredFrom);

    setFiltered(filteredLevel);
  }, [filterWords, posts.edges]);

  const filterPost = (name, words, posts) => {
    let result = [];

    if (words.length === 0) {
      return posts;
    } else if (name === 'key') {
      return posts.filter((post) =>
        post.node.frontmatter.title
          .toLowerCase()
          .includes(words[0].toLowerCase())
      );
    } else {
      words.forEach((word) => {
        posts
          .filter((post) => post.node.frontmatter[name].includes(word))
          .forEach((element) => {
            result.push(element);
          });
      });
    }

    return result;
  };

  const handleToggle = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const deletedIndex = filterWords[name].indexOf(value);
    const newFilter = [...filterWords[name]];

    if (deletedIndex === -1) {
      newFilter.push(value);
    } else {
      newFilter.splice(deletedIndex, 1);
    }

    setFilterWords({ ...filterWords, [name]: newFilter });
  };

  const handleChange = (event) => {
    setFilterWords({ ...filterWords, keyword: [event.target.value] });
  };

  const handleShow = (event) => {
    setShow(!show);
  };

  const handleUp = (event) => {
    setUp(!up);
  };

  const handleReset = (event) => {
    setFilterWords({ from: [], level: [], keyword: [] });
  };

  const checkboxGroup = [
    { title: '출처', items: froms.group, name: 'from' },
    { title: '난이도', items: levels.group, name: 'level' },
  ];

  const filterCheckList = checkboxGroup.map((group, i) => {
    const listItems = group.items.map((item, i) => {
      return (
        <li key={i}>
          <Checkbox
            name={group.name}
            value={item.fieldValue}
            handleCheck={handleToggle}
            type={`filter`}
            isChecked={filterWords[group.name].includes(item.fieldValue)}
          />
        </li>
      );
    });

    return (
      <div className="wrap-filters menu" key={i}>
        <div className="menu-title">{group.title}</div>
        <ul className="button-list">{listItems}</ul>
      </div>
    );
  });

  const seo = {
    description: pageText.algorithm,
    path: `/algorithm`,
  };

  return (
    <Layout title={`Algorithm`} pageSEO={seo}>
      <Top title={`Algorithm`} bg={`algorithm`} />
      <section className="container page-middle">
        <div className="wrap-line">
          <div className="count">
            {countPosts} / {countTotal}
          </div>
          <div className="wrap-buttons">
            <Search
              handleChange={handleChange}
              type={`click`}
              placeholder={`제목으로 검색`}
            />
            <Button type={`key`} handleToggle={handleShow} isChecked={show} />
            <Button type={`side`} handleToggle={handleUp} />
            <div className="page-up">
              <label
                className="close m-right"
                htmlFor={`side`}
                onClick={handleUp}
              >
                <MdClose />
              </label>
              <button className="reset m-left" onClick={handleReset}>
                RESET
                <MdReplay />
              </button>
              <div className="m-center">{filterCheckList}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-wide vertical">
        <div className="page-left">
          <button className="reset" onClick={handleReset}>
            RESET
            <MdReplay />
          </button>
          {filterCheckList}
        </div>
        <div className="page-body">
          {filtered.length > 0 ? (
            <ProblemList postEdges={filtered} show={show} />
          ) : (
            <div className="none">조건에 맞는 결과가 없습니다.</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query AlgorithmQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { nav: { eq: "algorithm" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "M/D")
            tags
            from
            level
          }
          fields {
            slug
          }
        }
      }
    }

    froms: allMarkdownRemark {
      group(field: frontmatter___from) {
        fieldValue
      }
    }

    levels: allMarkdownRemark {
      group(field: frontmatter___level) {
        fieldValue
      }
    }

    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;

export default AlgorithmPage;
